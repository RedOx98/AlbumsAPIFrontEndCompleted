// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  LogoutOutlined
};

const isLoginEnabled = localStorage.getItem("token");

const caseLogin = [{
  id: 'logout1',
    title: 'Logout',
    type: 'item',
    url: '/logout',
    icon: icons.LogoutOutlined,
    target: true,
}]

const caseLogout = [
  {
    id: 'login',
    title: 'Login',
    type: 'item',
    url: '/login',
    icon: icons.LoginOutlined,
    target: true,
  },
  {
    id: 'register1',
    title: 'Register',
    type: 'item',
    url: '/register',
    icon: icons.ProfileOutlined,
    target: true,
  }
]

const auth = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    isLoginEnabled && caseLogin[0],
    !isLoginEnabled && caseLogout[0],
    !isLoginEnabled && caseLogout[1]
  ].filter(Boolean)
};

export default auth;


    /**
     * 
     *  // Conditionally include login page
    isLoginEnabled ?
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.LogoutOutlined,
      target: true
    }
    : // Else condition
    {
      id: 'disabledlogin',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true,
      // disabled: true // Add any specific property for the disabled state
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true,
      disabled: true // Add any specific property for the disabled state
    }
     */
