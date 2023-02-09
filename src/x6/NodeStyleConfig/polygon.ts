import { commonStyele } from './commonStyle'
export default {
  width: 70,
  height: 50,
  markup: [
    {
      tagName: 'polygon',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  // tools: commonStyele.tools,
  attrs: {
    body: {
      fill: commonStyele.body.fill,
      stroke: commonStyele.body.stroke,
      strokeWidth: commonStyele.body.strokeWidth,
      refPoints: '0,10 10,0 20,10 10,20'
    },
    label: {
      fontSize: commonStyele.label.fontSize,
      fill: commonStyele.label.fill,
      fontFamily: commonStyele.label.fontFamily,
      textAnchor: commonStyele.label.textAnchor,
      textVerticalAnchor: commonStyele.label.textVerticalAnchor
    }
  }
}
