package com.yuri.common;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemCat {
	/**
	 * 我在java里面给它取名字 叫做url代表网址的意思
	 * 但是当这个url变成json格式的数据的时候 它的key就叫做u了
	 * {u:"http://www.baidu.com"}
	 * 因为导入了json有关的jar包jackson 所以有这些注解
	 * java用jackson阿里巴巴  安卓用Gson谷歌
	 */
	@JsonProperty("u")
	private String url;
	@JsonProperty("n")
	private String name;
	@JsonProperty("i")
	private List<?> item;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<?> getItem() {
		return item;
	}
	public void setItem(List<?> item) {
		this.item = item;
	}
	@Override
	public String toString() {
		return "ItemCat [url=" + url + ", name=" + name + ", item=" + item + "]";
	}
}
