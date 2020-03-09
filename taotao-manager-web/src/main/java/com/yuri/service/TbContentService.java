package com.yuri.service;

import java.util.List;

import com.yuri.bean.TbContent;

public interface TbContentService {
	/**
	 * 根据内容分类id查询内容信息
	 * @param categoryId 内容分类id
	 * @return 指定内容分类的内容集合信息
	 */
	List<TbContent> findContents(Long categoryId);

}
