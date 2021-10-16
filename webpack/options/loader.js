/**
 * @description loader配置
 */
module.exports = {
	rules: [
		{
			test: /.(js|jsx|ts|tsx)$/,
			use: {
				loader: "babel-loader?cacheDirectory",
				options: {
					presets: [
						"@babel/preset-env",
						"@babel/preset-react",
						"@babel/preset-typescript",
					],
					plugins: [
						[
							"import",
							{
								libraryName: "antd",
								libraryDirectory: "lib",
								style: false,
							},
							"antd",
						],
						[
							"import",
							{ libraryName: "antd-mobile", style: false },
							"antd-mobile",
						],
						["@babel/proposal-decorators", { legacy: true }],
						"@babel/proposal-class-properties",
					]
				}
			}
		}
	]
};
