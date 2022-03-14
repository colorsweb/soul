import * as PIXI from 'PIXI.js'
export function initPixi() {
  const app = new PIXI.Application({
    width: 600,
    height: 600,
  })
  app.renderer.backgroundColor = 0x061639
  document.querySelector('#mine-ani').appendChild(app.view)
  document.querySelector('#mine-ani').style.background = 'rgba(134,34,567,.5)'
  // document.querySelector('#mine-ani').style.opacity = 1
  return app
}
