self.Module = {
  onRuntimeInitialized: function () {
    onWasmLoaded();
  },
};

self.importScripts("common.js");
self.importScripts("libffmpeg.js");

function Decoder() {
  this.logger = new Logger("Decoder");
  this.coreLogLevel = 1;
  this.accurateSeek = true;
  this.wasmLoaded = false;
  this.tmpReqQue = [];
  this.cacheBuffer = null;
  this.decodeTimer = null;
  this.videoCallback = null;
  this.audioCallback = null;
  this.requestCallback = null;
  this.downMp4 = new Uint8Array();
}
// 清空解码器缓存
Decoder.prototype.onEraseBuffer = function () {
  Module._EraseBuffer();
};

Decoder.prototype.openSound = function (isOpen) {
  Module._openSound(isOpen);
};

Decoder.prototype.continue = function () {
  Module._Continue();
};

Decoder.prototype.pause = function () {
  Module._Pause();
};

Decoder.prototype.getCurEsCount = function () {
  var count = Module._GetCurEsCount();
  var objData = {
    t: kGetCurEsCountRsp,
    l: count,
  };
  self.postMessage(objData);
};

Decoder.prototype.getAudioCurEsCount = function () {
  var count = Module._GetAudioCurEsCount();
  var objData = {
    t: kGetAudioCurEsCountRsp,
    l: count,
  };
  self.postMessage(objData);
};

//初始化解码器
Decoder.prototype.initDecoder = function (fileSize, chunkSize) {
  if (this.requestCallback) {
    var ret = Module._initDecoder(
      this.requestCallback,
      this.videoCallback,
      this.audioCallback
    );
    this.logger.logInfo("initDecoder return " + ret + ".");
    if (0 == ret) {
      this.cacheBuffer = Module._malloc(chunkSize);
    }
    var objData = {
      t: kInitDecoderRsp,
      e: ret,
    };
    self.postMessage(objData);
  }
};
//反初始化解码器
Decoder.prototype.uninitDecoder = function () {
  var ret = Module._uninitDecoder();
  this.logger.logInfo("Uninit ffmpeg decoder return " + ret + ".");
  if (this.cacheBuffer != null) {
    Module._free(this.cacheBuffer);
    this.cacheBuffer = null;
  }
  if (ret == 0) {
    self.postMessage({ t: kUninitDecoderRsp });
  }
};

//关闭解码器
Decoder.prototype.closeDecoder = function () {
  this.logger.logInfo("closeDecoder.");
  if (this.decodeTimer) {
    clearInterval(this.decodeTimer);
    this.decodeTimer = null;
    this.logger.logInfo("Decode timer stopped.");
  }

  var ret = Module._closeDecoder();
  this.logger.logInfo("Close ffmpeg decoder return " + ret + ".");

  var objData = {
    t: kCloseDecoderRsp,
    e: 0,
  };
  self.postMessage(objData);
};
//开始码流
Decoder.prototype.startDecoding = function (interval) {
  var that = this;
  if (that.decodeTimer) {
    clearInterval(that.decodeTimer);
  }

  this.decodeTimer = setInterval(function () {
    that.decode(interval);
  }, interval);
};
//暂停码流
Decoder.prototype.pauseDecoding = function () {
  if (this.decodeTimer) {
    clearInterval(this.decodeTimer);
    this.decodeTimer = null;
  }
};

Decoder.prototype.decode = function (interval) {
  var ret = Module._decodeOnePacket();
  // if (ret == 7) {
  //   self.decoder.logger.logInfo("Decoder finished.");
  //   self.decoder.pauseDecoding();
  //   var objData = {
  //     t: kDecodeFinishedEvt,
  //   };
  //   self.postMessage(objData);
  // }

  // while (ret == 9) {
  //   //self.decoder.logger.logInfo("One old frame");
  //   ret = Module._decodeOnePacket();
  // }
};
//发数据到FFmpeg
Decoder.prototype.sendData = function (data) {
  var typedArray = new Uint8Array(data);
  Module.HEAPU8.set(typedArray, this.cacheBuffer);
  Module._sendData(this.cacheBuffer, typedArray.length);
  this.getCurEsCount();
  this.getAudioCurEsCount();
};
//seekTo 之前的时间点
Decoder.prototype.seekTo = function (ms) {
  var accurateSeek = this.accurateSeek ? 1 : 0;
  var ret = Module._seekTo(ms, accurateSeek);
  var objData = {
    t: kSeekToRsp,
    r: ret,
  };
  self.postMessage(objData);
};

//设置播放速率
Decoder.prototype.setSpeed = function (speed) {
  var ret = Module._SetScale(speed);
  var objData = {
    t: kSpeedRsp,
    r: ret,
  };
  self.postMessage(objData);
};

Decoder.prototype.processReq = function (req) {
  //this.logger.logInfo("processReq " + req.t + ".");
  switch (req.t) {
    case kInitDecoderReq: //初始化解码器
      this.initDecoder(req.s, req.c);
      break;
    case kUninitDecoderReq:
      this.uninitDecoder();
      break;
    case KOpenSoundReq:
      this.openSound(req.i);
      break;
    case kCloseDecoderReq:
      this.closeDecoder();
      break;
    case kStartDecodingReq:
      this.startDecoding(req.i);
      break;
    case kPauseDecodingReq:
      this.pauseDecoding();
      break;
    case kFeedDataReq:
      this.sendData(req.d);
      break;
    case kSeekToReq:
      this.seekTo(req.ms);
      break;
    case kContinueReq:
      this.continue();
      break;
    case kPauseReq:
      // console.log("暂停解码0")
      this.pause();
      break;
    case kSpeedReq:
      this.setSpeed(req.speed);
      break;
    case kGetCurEsCountReq:
      this.getCurEsCount();
      break;
    case kGetAudioCurEsCountReq:
      this.getAudioCurEsCount();
      break;
    case KDecodeReq:
      this.decode();
      break;
    case KClearDecode:
      this.onEraseBuffer();
      break;
    default:
      this.logger.logError("Unsupport messsage " + req.t);
  }
};

Decoder.prototype.cacheReq = function (req) {
  if (req) {
    this.tmpReqQue.push(req);
  }
};
//页面打开时，初始化Wasm loaded.
Decoder.prototype.onWasmLoaded = function () {
  this.logger.logInfo("Wasm loaded.");
  this.wasmLoaded = true;

  this.videoCallback = Module.addFunction(function (buff, size, timestamp, pos) {
    var outArray = Module.HEAPU8.subarray(buff, buff + size);
    var data = new Uint8Array(outArray);
    var objData = {
      t: kVideoFrame,
      s: timestamp,
      d: data,
      p: pos
    };
    self.postMessage(objData, [objData.d.buffer]);
  }, "viidd");

  this.audioCallback = Module.addFunction(function (buff, size, timestamp) {
    var outArray = Module.HEAPU8.subarray(buff, buff + size);
    var data = new Uint8Array(outArray);
    var objData = {
      t: kAudioFrame,
      s: timestamp,
      d: data,
    };
    self.postMessage(objData, [objData.d.buffer]);
  }, "viid");

  this.requestCallback = Module.addFunction(function (
    cmd,
    paramArray,
    paramCount
  ) {
    console.log("requestCallback paramArray", paramArray);

    var paramIntBuff = paramArray >> 2;
    var outArray = Module.HEAP32.subarray(
      paramIntBuff,
      paramIntBuff + paramCount
    );
    //var data = new Uint8Array(outArray);

    var duration = outArray[0];
    var videoPixFmt = outArray[1];
    var videoWidth = outArray[2];
    var videoHeight = outArray[3];
    var audioSampleFmt = outArray[4];
    var audioChannels = outArray[5];
    var audioSampleRate = outArray[6];

    var objData = {
      t: kOpenDecoderRsp,
      e: 0,
      v: {
        d: duration,
        p: videoPixFmt,
        w: videoWidth,
        h: videoHeight,
      },
      a: {
        f: audioSampleFmt,
        c: audioChannels,
        r: audioSampleRate,
      },
    };
    self.postMessage(objData);

    console.log("requestCallback return");
  },
    "viii");

  while (this.tmpReqQue.length > 0) {
    var req = this.tmpReqQue.shift();
    this.processReq(req);
  }
};

self.decoder = new Decoder();

self.onmessage = function (evt) {
  if (!self.decoder) {
    console.log("[ER] Decoder not initialized!");
    return;
  }

  var req = evt.data;

  if (!self.decoder.wasmLoaded) {
    self.decoder.cacheReq(req);
    self.decoder.logger.logInfo("Temp cache req " + req.t + ".");
    return;
  }

  self.decoder.processReq(req);
};

function onWasmLoaded() {
  if (self.decoder) {
    self.decoder.onWasmLoaded();
  } else {
    console.log("[ER] No decoder!");
  }
}
