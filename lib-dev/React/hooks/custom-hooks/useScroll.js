/**
 * @name  useScroll
 * @demand  1 监听滚动条滚动。 2 计算吸顶临界值，渐变值，透明度。 3 改变state渲染视图。
 */

import {useState, useRef, useEffect} from 'react';

export default function useScroll() {
  const dom = useRef(null)
  /* scrollOptions 保存控制透明度 ，top值 ，吸顶开关等变量 */
  const [scrollOptions, setScrollOptions] = useState({
    top: 0,
    suctionTop: false,
    opacity: 1
  })
 
  useEffect(() => {
    const box = (dom.current)
    const offsetHeight = box.offsetHeight
    const radio = box.offsetHeight / 500 * 20 // 
    const handerScroll = () => {
      const scrollY = window.scrollY
      /* 控制透明度 */
      const computerOpacty = 1 - scrollY / 160 // 160范围渐变
      /* 控制吸顶效果 */
      const offsetTop = offsetHeight - scrollY - offsetHeight / 500 * 84 // 距顶部偏移量
      const top = 0 - scrollY / 5
      setScrollOptions({
        opacity: computerOpacty <= 0 ? 0 : computerOpacty,
        top,
        suctionTop: offsetTop < radio
      })
    }
    document.addEventListener('scroll', handerScroll)
    return function () {
      document.removeEventListener('scroll', handerScroll)
    }
  }, [])
  return [scrollOptions, dom]
}
 