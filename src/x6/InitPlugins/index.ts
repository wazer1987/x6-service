import { Graph } from '@antv/x6'
import { pluginsConfig } from './puginsConfig'
export const initPlugins = (graph:Graph) => {
  for (const key in pluginsConfig) {
    if (Object.prototype.hasOwnProperty.call(pluginsConfig, key)) {
      const element = pluginsConfig[key]
      element(graph)
    }
  }
}
