package com.yuri.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.druid.stat.TableStat.Mode;
import com.yuri.bean.TbItem;
import com.yuri.bean.TbItemParamValue;
import com.yuri.common.Data;
import com.yuri.common.FtpUtil;
import com.yuri.common.IDUtils;
import com.yuri.common.LayuiTableResult;
import com.yuri.common.LayuiUploadResult;
import com.yuri.common.TaotaoResult;
import com.yuri.constant.Constant;
import com.yuri.service.TbItemService;

@Controller
@RequestMapping("/item")
public class TbItemController {
	//@Value注解的意思是 为一个属性赋值
	
	@Autowired
	private TbItemService tbItemService;
	
	@RequestMapping("/{itemId}")
	@ResponseBody
	public TbItem findTbItemById(@PathVariable Long itemId){
		//@PathVariable接收请求路径中占位符的值
		TbItem tbItem = tbItemService.findTbItemById(itemId);
		return tbItem;
	}
	
	@RequestMapping("/showItemPage")
	@ResponseBody
	public LayuiTableResult findTbItemByPage(Integer page,Integer limit){
		LayuiTableResult result = tbItemService.findTbItemByPage(page, limit);
		return result;
	}
	
	@RequestMapping("/itemDelete")
	@ResponseBody
	public TaotaoResult deleteItemById(@RequestBody List<TbItem> items){
		//TaotaoResult result = tbItemService.deleteItemByIds(items);
		Date date = new Date();
		TaotaoResult result = tbItemService.updateItems(items,2,date);
		return result;
	}
	
	@RequestMapping("/upshelf")
	@ResponseBody
	public TaotaoResult upshelf(@RequestBody List<TbItem> items){
		Date date = new Date();
		TaotaoResult result = tbItemService.updateItems(items,1,date);
		return result;
	}
	
	@RequestMapping("/offshelf")
	@ResponseBody
	public TaotaoResult offshelf(@RequestBody List<TbItem> items){
		Date date = new Date();
		TaotaoResult result = tbItemService.updateItems(items,0,date);
		return result;
	}
	
	@RequestMapping("/search")
	@ResponseBody
	public LayuiTableResult search(Integer page,Integer limit,String title,Integer minPrice,Integer maxPrice,Long cId){
		LayuiTableResult result = tbItemService.searchItems(page,limit,title,minPrice,maxPrice,cId);
		return result;
	}
	
	/**
	 * 文件图片接口 把图片上传到图片服务器上面去 不写入到mysql数据库中
	 * @param file 需要上传的文件名称
	 * @return
	 */
	@RequestMapping("/fileUpload")
	@ResponseBody
	public LayuiUploadResult fileUpload(MultipartFile file){
		try {
			//在这里面 我们是进行把图片存入图片服务器 并且把图片服务器的路径返回给页面
			//上传多图 多次请求多次相应
			Date date = new Date();
			//每天上传的图片 都按照每天的文件夹分好
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			//图片路径
			String filePath = format.format(date);
			//得到需要上传的图片名称
			String fileName = file.getOriginalFilename();
			//通过 springmvc的MultipartFile参数 来得到 图片上传的io流 吧他做为参数传入到 我们封装好的方法里面去
			InputStream input = file.getInputStream();
			//不管页面传递过来的图片 名字叫做什么 比如叫做abc.jpg aaaaa.png 我只要 （随机数生成的图片名称）.png
			fileName = IDUtils.genImageName() + fileName.substring(fileName.lastIndexOf("."));
			FtpUtil.uploadFile(Constant.FTP_ADDRESS, Constant.FTP_PORT, Constant.FTP_USERNAME, Constant.FTP_PASSWORD,
					Constant.FILI_UPLOAD_PATH, filePath, fileName, input);
			LayuiUploadResult result = new LayuiUploadResult();
			result.setCode(0);
			result.setMsg("");
			Data data = new Data();
			data.setSrc(Constant.IMAGE_BASE_URL+"/"+filePath+"/"+fileName);
			result.setData(data);
			return result;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//我们发回给页面的不是 ok 老铁 我们发回去的应该是 图片的路径
		return null;
	}
	
	@RequestMapping("/addItem")
	@ResponseBody
	public TaotaoResult addItem(TbItem item,String itemDesc,@RequestParam(value="paramValue[]")String[] paramValue,@RequestParam(value="paramKeyId[]")Integer[] paramKeyId){
		//@RequestParam(value = "titles[]") String[] titles接收数组类型参数
		List<TbItemParamValue> tbItemParamValues = new ArrayList<TbItemParamValue>();
		for(int i = 0;i<paramKeyId.length;i++){
			TbItemParamValue tbItemParamValue = new TbItemParamValue();
			tbItemParamValue.setParamId(paramKeyId[i]);
			tbItemParamValue.setParamValue(paramValue[i]);
			tbItemParamValues.add(tbItemParamValue);
		}
		TaotaoResult result = tbItemService.saveItem(item,itemDesc,tbItemParamValues);;
		return result;
	}
	
}
