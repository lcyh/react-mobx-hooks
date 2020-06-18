/*
 * @file: GlobalModel
 * @author: lc
 * @description: 用来存放全局数据的 Model
 */
import { observable, action } from "mobx";

class GlobalModel {
  @observable username = "小明";
  /**
   * 修改 username 的方法
   */
  @action
  changeUserName = (name: string) => {
    this.username = name;
  };
}
export default new GlobalModel();
