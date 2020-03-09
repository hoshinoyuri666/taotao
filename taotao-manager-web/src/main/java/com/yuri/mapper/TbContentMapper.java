package com.yuri.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.yuri.bean.TbContent;

public interface TbContentMapper {

	@Select("SELECT * FROM tbcontent WHERE categoryId = #{categoryId}")
	List<TbContent> findContents(Long categoryId);

}
