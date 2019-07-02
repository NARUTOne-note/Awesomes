import React from 'react';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import RenderRouter from '@/components/RenderRouter/';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import navsList from '@/mock/nav';
import {getNodeByKeyValues} from 'flo-utils';
import {RouterProps, RenderRouterProps} from '@/utils/interface';

interface Props extends RenderRouterProps<Object>, RouteComponentProps {}

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App<T> extends React.Component<Props, {}> {
  state = {
    collapsed: false,
  };

  componentWillReceiveProps (nextProps: RouteComponentProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.init(nextProps)
    }
  }

  componentDidMount () {
    this.init(this.props);
  }

  init (props: RouteComponentProps) {
    const {location} = props;

    if (location.pathname === '/') {
      this.props.history.push('/home');
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenu (navData: RouterProps<Object>[]) {
    const subTitle = (item: RouterProps<T>) => <span><Icon type={item.icon || 'compass'} />
      <span className="nav-text">{item.title}</span>
      <span className="nav-sub-text">{item.subTitle}</span>
    </span>;
    return navData.map((item) => {
      if(item.children && item.children.length) {
        return (<SubMenu key={item.path} title={subTitle(item)}>
          {this.renderMenu(item.children)}
        </SubMenu>);
      }
      else {
        return (<Menu.Item key={item.path}>
          <Link
            to={item.path}
          >
            <span className="nav-text">{item.title}</span>
            <span className="nav-sub-text">{item.subTitle}</span>
          </Link>
        </Menu.Item>);
      }
    });
  }

  render() {
    const {location, routers} = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const nodes = getNodeByKeyValues(navsList, [url], 'path');
      const curr = nodes[0] || {};
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{curr.title}</Link>
        </Breadcrumb.Item>
      );
    });

    if (location.pathname === '/404') {
      return <div className="app-page">
         <Layout className="app-page-layout">
          <Content className="app-body">
            <RenderRouter routers={routers}></RenderRouter>
          </Content>
         </Layout>
      </div>
    }

    return (
      <div className="app-page">
        <Layout className="app-page-layout">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="app-logo" />
            <Menu theme="dark" mode="inline">
              {this.renderMenu(navsList)}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 8px' }}>
              <Row gutter={8}>
                <Col span={4}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col span={16} className="t-center">
                  <span className="bold default-color" style={{fontSize: 22}}>React学习</span>
                </Col>
                <Col span={4} className="t-right">
                  <span className='bold'>v16.8.6</span>&nbsp;&nbsp;
                  <a href="https://react.docschina.org/"><Icon type='github'/></a>
                </Col>
              </Row>
            </Header>
            <Content className="app-body">
              <div className="app-bread">
                <Breadcrumb style={{ margin: '12px 8px' }}>
                  <Breadcrumb.Item><Link to='/'>React</Link></Breadcrumb.Item>
                  {extraBreadcrumbItems}
                </Breadcrumb>
              </div>
              <div className="app-body-content">
                <RenderRouter routers={routers}></RenderRouter>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright©{new Date().getFullYear()} Corporation All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter<Props>(App as any);
