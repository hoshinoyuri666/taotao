package com.yuri.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.junit.Test;

public class MyTest {
//	@Test
//	public void show() throws Exception{
//		/**
//		 * 通过java代码把图片上传到图片服务器
//		 * 现在用免费的ftp图片服务器 用ftp的代码上传图片到图片服务器
//		 */
//		//创建ftp客户端对象 它用来通过ftp协议 来连接我们的图片服务器 ftp图片服务器
//		FTPClient ftpClient = new FTPClient();
//		//你要连接哪个服务器 要知道ip地址
//		ftpClient.connect("192.168.189.128");
//		//输入账号密码
//		ftpClient.login("ftpuser", "ftpuser");
//		//解决图片上传的时候 上传的图片0kb的情况
//		ftpClient.enterLocalPassiveMode();
//		//指定图片的上传类型 固定写法
//		ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
//		InputStream inputStream = new FileInputStream(new File("D:\\赵程煜照片\\1.jpg"));
//		/**
//		 * 1.把图片上传到哪个位置去
//		 * /home/ftpuser/www/images/固定写法
//		 * 123.jpg要上传的图片名称
//		 * 2.inputStream
//		 * 你要上传哪张图片 要把图片变成input输入流才行
//		 * 输入流 从硬盘读取图片 到java内存中
//		 * 把内存中的图片放到第二个参数里 图片就从内存里上传到了ftp服务器上面了
//		 */
//		ftpClient.storeFile("/home/ftpuser/www/images/123.jpg", inputStream);
//		//关闭流
//		inputStream.close();
//		//关闭ftp的流
//		ftpClient.logout();
//		System.out.println("上传成功了");
//	}
}
