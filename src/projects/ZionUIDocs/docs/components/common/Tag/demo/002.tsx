import React from 'react';
import { Tag } from "zion-ui"

export const Demo = function () {
	const SuccessTag = Tag({
		text: "success",
		type: "success"
	}, true)
	const ErrorTag = Tag({
		text: "error",
		type: "error"
	}, true)
	const ProcessingTag = Tag({
		text: "processing",
		type: "processing"
	}, true)
	const WaitingTag = Tag({
		text: "waiting",
		type: "waiting"
	}, true)
	const WarningTag = Tag({
		text: "warning",
		type: "warning"
	}, true)
	return <div>
		<SuccessTag />
		<ErrorTag />
		<ProcessingTag />
		<WaitingTag />
		<WarningTag />
	</div>
}

export const code = `
import React from 'react';
import { Tag } from "zion-ui"

export const Demo = function () {
  const SuccessTag = Tag({
    text: "success",
    type: "success"
  }, true)
  const ErrorTag = Tag({
    text: "error",
    type: "error"
  }, true)
  const ProcessingTag = Tag({
    text: "processing",
    type: "processing"
  }, true)
  const WaitingTag = Tag({
    text: "waiting",
    type: "waiting"
  }, true)
  const WarningTag = Tag({
    text: "warning",
    type: "warning"
  }, true)
  return <div>
    <SuccessTag />
    <ErrorTag />
    <ProcessingTag />
    <WaitingTag />
    <WarningTag />
  </div>
}
`
