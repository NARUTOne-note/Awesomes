import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import RenderRouter from '@/components/RenderRouter/';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import navsList from '@/mock/nav';
import getNodeByKeyValues from 'flo-utils/lib/collection/getNodeByKeyValues';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenu (navData) {
    const subTitle = (item) => <span><Icon type={item.icon || 'compass'} />
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
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content className="app-body">
              <div className="app-bread">
                <Breadcrumb style={{ margin: '12px 8px' }}>
                  <Breadcrumb.Item><Link to='/'>React</Link></Breadcrumb.Item>
                  {extraBreadcrumbItems}
                </Breadcrumb>
              </div>
              <RenderRouter routers={routers}></RenderRouter>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright©{new Date().getFullYear()} Corporation All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
