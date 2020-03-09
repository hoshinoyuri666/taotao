package com.yuri.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yuri.bean.TbContent;
import com.yuri.common.LayuiTableResult;
import com.yuri.common.TaotaoResult;
import com.yuri.common.ZtreeNodeResult;
import com.yuri.service.TbContentService;

@Controller
@RequestMapping("/content")
public class TbContentController {
	
	@Autowired
	private TbContentService tbContentService;
	
	@RequestMapping("/showContentZtree")
	@ResponseBody
	public List<ZtreeNodeResult> showContentZtree(@RequestParam(value="id", defaultValue="0")Long parentId){
		/**
		 * @RequestParam 注解用于指定 页面传递过来的参数名称 
		 * 页面传递过来id defaultValue如果页面传递过来的参数名字为id的 没有初始值 默认初始值为 0 即默认显示一级目录
		 */
		List<ZtreeNodeResult> result = tbContentService.findTbContentById(parentId);
		return result;
	}
	
	@RequestMapping("/showContentTable")
	@ResponseBody
	public LayuiTableResult showContentTable(@RequestParam(value="categoryId", defaultValue="0")Long categoryId,Integer page,Integer limit){
		//默认情况下，没有携带参数分类id，所以直接返回null，table表不会展示数据
		if(categoryId==0){
			return null;
		}
		LayuiTableResult result = tbContentService.findTbContentByCategoryId(categoryId,page,limit);
		return result;
	}
	
	@RequestMapping("/deleteContentByCategoryId")
	@ResponseBody
	public LayuiTableResult deleteContent(@RequestBody List<TbContent> tbContents,@RequestParam(value="page", defaultValue="1")Integer page,@RequestParam(value="limit", defaultValue="10")Integer limit){
		LayuiTableResult result = tbContentService.deleteContentByCategroyIds(tbContents,page,limit);
		return result;
	}
	
	@RequestMapping("/addContent")
	@ResponseBody
	public TaotaoResult addContent(TbContent tbContent){
		TaotaoResult result = tbContentService.addContent(tbContent);
		
		return result;

	
	}
	
}
