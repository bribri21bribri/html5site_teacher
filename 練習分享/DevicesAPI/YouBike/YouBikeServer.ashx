<%@ WebHandler Language="C#" Class="YouBikeHandler" %>

using System;
using System.Web;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

public class YouBikeHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string appPath = context.Request.PhysicalApplicationPath + "YouBike/";
        //透過WebClient下載YouBike的即時資訊
        using (WebClient webClient = new WebClient())
        {
            string myFile=  appPath + "YouBikeTP.gz";
            webClient.DownloadFile("http://data.taipei/youbike", myFile);

            //因為YouBike提供的檔案格式為經gz壓縮之json檔
            //所以要先解縮
            FileInfo fi1 = new FileInfo(myFile);
            decomp(fi1);
        }

        string filename = appPath + "YouBikeTP.json";

        //todo1  將下列_________換成適當的Content-type
        context.Response.AppendHeader("Content-type", "text/event-stream");
        //todo2  因資料檔每一分鐘更新一次，所以將下列__________._________換成適當的關鍵字及時間
        context.Response.Write("retry:60000" + "\n");
        //todo3 傳送資料，將下列_________換成適當的關鍵字
        context.Response.Write(string.Format("data:{0}\n\n", File.ReadAllText(filename)));
    }

    //解壓縮程式
    public static void decomp(FileInfo fi)
    {
        long i = 0; long c;
        using (FileStream inFile = fi.OpenRead())
        {
            string curFile = fi.FullName;
            string origName = curFile.Remove(curFile.Length - fi.Extension.Length);
            using (FileStream outFile = File.Create(origName + ".json"))
            {
                using (GZipStream Dc = new GZipStream(inFile,CompressionMode.Decompress)){
                    byte[] buffer = new byte[10240];
                    int numRead;
                    while ((numRead = Dc.Read(buffer, 0, buffer.Length)) != 0)
                    {
                        outFile.Write(buffer, 0, numRead);
                        c = (numRead + i);
                    }
                }
            }
        }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}