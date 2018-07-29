//定义一个包含用户信息的对象(模拟)
const userMap = {
  admin : {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  }
} ;

//最后默认暴露一个事件处理的对象
//通过外部的mock访问时候进行调用
export default {
  loginByUsername: config => {
    //定义用户进行用户名进行登录时候返回的数据
    //即返回对应的用户的用户信息
    const { username } = JSON.parse( config.body ).data ;
    return userMap[ username ] ;
  },
  getUserInfoByToken: config => {
    //定义用户进行token登录时候返回的数据
    //即通过token查找 返回对应的用户信息等
    const { token } = JSON.parse( config.body ).data ;
    return userMap[ token ] ;
  }
}
