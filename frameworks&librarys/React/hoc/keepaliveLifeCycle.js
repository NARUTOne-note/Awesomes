import {lifeCycles} from '../core/keeper'
import hoistNonReactStatic from 'hoist-non-react-statics'

// 加上生命周期
export function keepaliveLifeCycle(Component) {
   class Hoc extends React.Component {
    cur = null
    handerLifeCycle = type => {
      if (!this.cur) return
      const lifeCycleFunc = this.cur[type]
      isFuntion(lifeCycleFunc) && lifeCycleFunc.call(this.cur)
    }
    componentDidMount() { 
      const {cacheId} = this.props
      cacheId && (lifeCycles[cacheId] = this.handerLifeCycle)
    }
    componentWillUnmount() {
      const {cacheId} = this.props
      delete lifeCycles[cacheId]
    }
     render=() => <Component {...this.props} ref={cur => (this.cur = cur)}/>
  }
  return hoistNonReactStatic(Hoc,Component)
}
