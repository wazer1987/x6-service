export const commonStyele = {
  body: {
    fill: '#fff',
    stroke: '#1a1a1a',
    strokeWidth: 2
  },
  label: {
    fontSize: 12,
    fill: '#333',
    fontFamily: 'Arial, helvetica, sans-serif',
    textAnchor: 'middle',
    textVerticalAnchor: 'middle'
  },
  tools: [
    {
      name: 'button-remove',
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              r: 6,
              stroke: '#1a1a1a',
              'stroke-width': 1,
              fill: '#fff',
              cursor: 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '×',
            selector: 'icon',
            attrs: {
              fill: '#1a1a1a',
              stroke: '#1a1a1a',
              'stroke-width': 1,
              // 'font-size': 8,
              'text-anchor': 'middle',
              textVerticalAnchor: 'middle',
              y: '0.3em'
            }
          }
        ],
        x: '100%',
        y: 0,
        offset: { x: 8, y: -8 }
      }
    }
  ]
}
