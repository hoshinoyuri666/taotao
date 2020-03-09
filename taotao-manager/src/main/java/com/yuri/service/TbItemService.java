package com.yuri.service;

import java.util.Date;
import java.util.List;

import com.yuri.bean.TbItem;
import com.yuri.bean.TbItemParamValue;
import com.yuri.common.LayuiTableResult;
import com.yuri.common.TaotaoResult;

public interface TbItemService {
	/**
	 * 根据商品id查询指定商品信息
	 * @param tbItemId 商品id
	 * @return 指定商品id的商品信息
	 */
	TbItem findTbItemById(Long tbItemId);
	
	//查询商品表的总记录条数
	int findTbItemCount();
	
	/**
	 * 分页显示商品信息
	 * @param page 当前页 需要计算索引的
	 * @param limit 每一页显示的条数
	 * @return layui指定的json格式
	 */
	LayuiTableResult findTbItemByPage(Integer page,Integer limit);
	
	/**
	 * 返回TaotaoResult对象 里面有三个属性 status msg data
	 * status:代表响应的状态码 如果为200则删除成功 否则500删除失败
	 * msg:代表提示页面的信息
	 * data:如果页面需要一个json格式的数据作为操作 那么data里面就是这个对象
	 * @param items 需要删除的商品信息集合对象 但是我们只要id
	 * @return 返回TaotaoResult对象
	 */
	TaotaoResult deleteItemByIds(List<TbItem> items);
	
	/**
	 * 返回TaotaoResult对象 里面有三个属性 status msg data
	 * status:代表响应的状态码 如果为200则删除成功 否则500删除失败
	 * msg:代表提示页面的信息
	 * data:如果页面需要一个json格式的数据作为操作 那么data里面就是这个对象
	 * 上架下架和删除方法 但是这个删除不是真的删除数据而是修改商品状态
	 * @param items 需要修改状态的商品信息集合对象 但是我们只要id
	 * @param type 1代表上架 0代表下架 2代表删除
	 * @param date 代表更新时间
	 * @return
	 */
	TaotaoResult updateItems(List<TbItem> items,Integer type,Date date);

	/**
	 * 多条件查询商品信息
	 * @param page 开始索引 一开始为第一页 默认值为1
	 * @param limit 每一页显示的记录条数 默认值为10
	 * @param title 商品名称 如果页面不传入参数默认值为""空字符串
	 * @param minPrice 商品价格区间最低价 如果页面不传入参数默认值为null
	 * @param maxPrice 商品价格区间最高价 如果页面不传入参数默认值为null
	 * @param cId 商品分类id 如果页面不传入参数入参数默认值为null
	 * @return layui需要的json格式对象
	 */
	LayuiTableResult searchItems(Integer page, Integer limit, String title, Integer minPrice, Integer maxPrice, Long cId);

	/**
	 * 添加商品信息和商品描述信息和商品规格参数信息
	 * @param item 商品基本信息
	 * @param itemDesc 商品描述信息
	 * @param tbItemParamValues 商品规格参数值集合数据
	 * @return 如果为200则表示成功 如果失败 msg里面有失败的提示
	 */
	TaotaoResult saveItem(TbItem item, String itemDesc, List<TbItemParamValue> tbItemParamValues);
}
