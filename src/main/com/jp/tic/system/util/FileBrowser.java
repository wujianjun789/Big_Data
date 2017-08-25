package com.jp.tic.system.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;

import net.sf.json.JSONArray;

public class FileBrowser extends HttpServlet {
	
	private static final long serialVersionUID = 1599390137455995515L;  
	  
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        response.setContentType("text/html");  
        response.setCharacterEncoding("UTF-8");  
        PrintWriter out = response.getWriter();  
          
        String path = request.getParameter("path");  
        path = path == null ? "" : URLDecoder.decode(path, "UTF-8");  
        String method = request.getParameter("method");  
        FileInfo info = new FileInfo();  
        if ("getData".equals(method)) {  
        	if ("root".equals(path)) {            
                FileSystemView fsv = FileSystemView.getFileSystemView();  
                File[] roots = fsv.getRoots(); //File.listRoots();  
                //桌面  
                for (File f : roots) {  
                    info.getChildren().add(FileUtils.getFileInfo(f));  
                }  
                for (File f : roots[0].listFiles()) {  
                    if (f.getName().contains("My Documents")) {  
                        info.getChildren().add(FileUtils.getFileInfo(f));  
                    }  
                }  
                FileInfo fileInfo = new FileInfo();  
                fileInfo.setName("我的电脑");  
                fileInfo.setPath("My Computer");  
                for (File fi : roots[0].listFiles()[0].listFiles()) {  
                    fileInfo.getChildren().add(FileUtils.getFileInfo(fi));  
                }  
                info.getChildren().add(fileInfo);  
                fileInfo = new FileInfo();  
                fileInfo.setName("网上邻居");  
                fileInfo.setPath("Network Place");  
                for (File fi : roots[0].listFiles()[1].listFiles()) {  
                    fileInfo.getChildren().add(FileUtils.getFileInfo(fi));  
                }  
                info.getChildren().add(fileInfo);  
                  
                out.print(JSONArray.fromObject(info.getChildren()).toString());  
            } else if (path != null && !"".equals(path)) {  
                FileUtils.getFileInfo(info, new File(path), new String[] {"*"});  
                out.print(JSONArray.fromObject(info.getChildren()).toString());  
            }   
        }  
        if ("mkDir".equals(method)) {  
            String dirName = request.getParameter("dirName");  
            dirName = dirName == null ? "" : URLDecoder.decode(dirName, "UTF-8");  
            boolean success = false;  
            try {  
                success = FileUtils.mkDir(path, dirName);  
                FileInfo node = FileUtils.getFileInfo(new File(FileUtils.getDoPath(path) + dirName));  
                out.print(JSONArray.fromObject(node));  
            } catch (Exception e) {  
                e.printStackTrace();  
                success = false;  
            }  
            System.out.println(success);  
        }  
        out.flush();  
        out.close();  
    }  
  
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        this.doGet(request, response);  
    }  
}
