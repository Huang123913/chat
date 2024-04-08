class EventBus {
  //事件池
  pond = {};
  //往事件池中添加事件
  $on(name: any, func: Function) {
    // 如果事件池中没有这个事件类型，就增加一个事件类型为空数组
    // name func 形参 传递进来的事件类型和函数名
    if (!this.pond.hasOwnProperty(name)) {
      this.pond[name] = [];
    }
    // 数组中有这个函数，直接return
    if (this.pond[name].some((item) => item === func)) return;
    // 数组中没有这个函数，push进去
    this.pond[name].push(func);
  }
  // 触发事件池中的事件
  $emit(name: any, ...arg) {
    let ary = this.pond[name] || [];
    ary.forEach((item) => {
      item(...arg);
    });
  }
  // $addListener (name, fun) {
  //      const e = this.events[type];
  //      if (!e) {
  //     //如果从未注册过监听函数，则将函数放入数组存入对应的键名下
  //     this.events[type]= [fun];
  //  } else {
  //         //如果注册过，则直接放入
  //         e.push(fun); }
  //     };
  $off(name: any, func: Function) {
    // 如果没有这个事件类型，直接return
    if (!this.pond[name]) return;
    let i = this.pond[name].indexOf(func);
    if (i === -1) return;
    this.pond[name].splice(i, 1);
  }
}
export default new EventBus();
