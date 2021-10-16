/**
 * @description 拖拽、拉伸相关的功能
 */
import React from "react"
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move'
import { dragBodyContainerClassName } from "../../../../@types/Table"
import { Resizable } from 'react-resizable';

export const DragAndResize = {
	onSortEnd: function (this: any, { oldIndex, newIndex }: any) {
		const { dataSource } = this.getProps()
		if (oldIndex !== newIndex) {
			const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
			this.setProps({ dataSource: newData });
		}
	},
	draggableBodyContainer(this: any, props: any) {
		const SortableContainerCom = SortableContainer((props: any) => <tbody {...props} />);
		return <SortableContainerCom
			useDragHandle
			disableAutoscroll
			helperClass={dragBodyContainerClassName}
			onSortEnd={DragAndResize.onSortEnd.bind(this)}
			{...props}
		/>
	},
	draggableBodyRow(this: any, { className, style, ...restProps }: any) {
		const SortableItem = SortableElement((props: any) => <tr {...props} />);
		const { dataSource } = this.getProps()
		const rowKey = this.rowKey
		const index = dataSource.findIndex((x: any) => x[rowKey] === restProps['data-row-key']);
		return <SortableItem index={index} {...restProps} />;
	},
	handleResize(this: any, index: any) {
		return (e: any, { size }: any) => {
			const { columns } = this.getProps()
			const nextColumns = [...columns];
			nextColumns[index] = {
				...nextColumns[index],
				width: size.width,
			};
			this.setProps({ columns: nextColumns });
		}
	},
	// 会有较大的性能问题，换其他方式实现
	ResizeableTitle(this: any, props: any) {
		const { onResize, width, ...restProps } = props;
		const { allowResize } = this.getProps()
		// if (!width || !allowResize) {
		return <th {...restProps} />
		// }
		return <Resizable width={width} height={0} onResize={onResize}>
			<th {...restProps} />
		</Resizable>
	}
}