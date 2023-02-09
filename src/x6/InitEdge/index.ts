import { Graph } from '@antv/x6'

export const initEdge = () => {
  Graph.registerEdge(
    'custom-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 2,

          targetMarker: {
            name: 'classic',
            width: 10,
            height: 6
          }
          // 连线的动画
          // stroke: '#1890ff',
          // strokeDasharray: 5,
          // style: {
          //   animation: 'ant-line 30s infinite linear'
          // }
        }
      },
      defaultLabel: {
        markup: [
          {
            tagName: 'rect',
            selector: 'body'
          },
          {
            tagName: 'text',
            selector: 'label'
          }
        ],
        attrs: {
          label: {
            fill: '#000',
            fontSize: 12,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'none'
          },
          body: {
            ref: 'label',
            fill: '#fff',
            stroke: '#8f8f8f',
            strokeWidth: 1,
            rx: 4,
            ry: 4,
            refWidth: '140%',
            refHeight: '140%',
            refX: '-20%',
            refY: '-20%'
          }
        },
        position: {
          distance: 0.5
          // options: {
          //   absoluteDistance: true,
          //   reverseDistance: true
          // }
        }
      },
      data: {
        name: ''
      }
    },
    true
  )
}
