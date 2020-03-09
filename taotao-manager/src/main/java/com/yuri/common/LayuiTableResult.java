package com.yuri.common;

import java.io.Serializable;
import java.util.List;

//包装类放在common包之下
//实体类都要实现Serializable 用于网络传输
public class LayuiTableResult implements Serializable{
	private int code;
	private String msg;
	private int count;
	//？代表object new对象new什么就是什么 不是单纯的object类
	//多次利用 比如查询商品分类信息 商品信息 商品规格参数信息
	private List<?> data;//分页显示的数据集合对象
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<?> getData() {
		return data;
	}
	public void setData(List<?> data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "LayuiTableResult [code=" + code + ", msg=" + msg + ", count=" + count + ", data=" + data + "]";
	}
}
