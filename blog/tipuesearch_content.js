var tipuesearch = {"pages":[{"url":"./pages/about/","title":"About","text":"2017Spring 機械設計工程系協同產品設計實習 課程倉儲: https://github.com/40423101/2017springcd_hw 課程投影片: https://40423101.github.io/2017springcd_hw/#/ 課程網誌: https://40423101.github.io/2017springcd_hw/blog/","tags":"misc"},{"url":"./w15.html","title":"協同產品設計實習第十五週練習","text":"齒輪嚙合練習 1. 800x600 為畫布大小, 在畫布正中央畫一個半徑為 250 畫素, 壓力角 20, 齒數為 36 齒, 且只有上半齒形的漸開線正齒輪輪廓. window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['gearW15'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") ctx.beginPath() ctx.lineWidth = \"600\" ctx.strokeStyle = \"white\" ctx.moveTo(0,600) ctx.lineTo(800,600) ctx.stroke() ctx.beginPath() ctx.fillStyle = \"#BA55D3\" ctx.font = \"30px ScriptS\" ctx.fillText(\"40423101\", (canvas.width)/2-60, (canvas.height)/2+25) ctx.stroke() 2. 800x600 的畫布, 請畫出只有一齒輪廓, 且充滿畫布 80% 範圍的正齒輪, 且該齒輪廓下方水平線, 連接兩端齒根圓點交的直線以紅色繪製, 且在齒輪下方以藍色字元寫上自己的學號. from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['w15-2'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2+2400 r = 8*(canvas.height/2) # 齒數 n = 20 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"black\") ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px Arial\" ctx.fillText(\"40423101\",360,600) ctx.stroke() 3. 由最右邊齒數 16 齒開始囓合, 依序增加 2 齒, 當排至平面四齒囓合後, 第五位組員則以垂直方向向下囓合兩個齒輪後, 轉由右至左水平排列 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"w15-3\" 的 canvas 中繪圖 canvas = doc[\"w15-3\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 16 # 第2齒輪齒數 n_g2 = 18 # 第3齒輪齒數 n_g3 = 20 # 第4齒輪齒數 n_g4 = 22 # 第5齒輪齒數 n_g5 = 24 # 第6齒輪齒數 n_g6 = 26 # 第7齒輪齒數 n_g7 = 28 # 第8齒輪齒數 n_g8 = 30 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.6*canvas.width)/(n_g1+n_g2+n_g3+n_g4) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 rp_g4 = m*n_g4/2 rp_g5 = m*n_g5/2 rp_g6 = m*n_g6/2 rp_g7 = m*n_g7/2 rp_g8 = m*n_g8/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.05+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.1+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 第4齒輪的圓心座標 x_g4 = x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g4 = y_g1 # 第5齒輪的圓心座標 x_g5 = x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g5 = y_g4+rp_g4+rp_g5 # 第6齒輪的圓心座標 x_g6 =x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g6 = y_g5+rp_g5+rp_g6 # 第7齒輪的圓心座標 x_g7 =x_g6-rp_g6-rp_g7 y_g7 = y_g5+rp_g5+rp_g6 # 第8齒輪的圓心座標 x_g8 =x_g7-rp_g7-rp_g8 y_g8 = y_g5+rp_g5+rp_g6 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"#FF3333 \") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#FF3333 \" ctx.font = \"20px Arial\" ctx.fillText(\"40423101 \",x_g1-25, y_g1) ctx.stroke() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"#9999FF \") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#9999FF \" ctx.font = \"20px Arial\" ctx.fillText(\"40423103 \",x_g2-25, y_g2) ctx.stroke() # 將第3齒輪逆時鐘轉 90 度之後, 再往回轉第2齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage # math.pi+math.pi/n_g2 為第2齒輪從順時鐘轉 90 度之後, 必須配合目前的標記線所作的齒輪 2 轉動角度, 要轉換到齒輪3 的轉動角度 # 必須乘上兩齒輪齒數的比例, 若齒輪2 大, 則齒輪3 會轉動較快 # 第1個 -math.pi/2 為將原先垂直的第3齒輪定位線逆時鐘旋轉 90 度 # -math.pi/n_g3 則是第3齒與第2齒定位線重合後, 必須再逆時鐘多轉一齒的轉角, 以便進行囓合 # (math.pi+math.pi/n_g2)*n_g2/n_g3 則是第2齒原定位線為順時鐘轉動 90 度, # 但是第2齒輪為了與第1齒輪囓合, 已經距離定位線, 多轉了 180 度, 再加上第2齒輪的一齒角度, 因為要帶動第3齒輪定位, # 這個修正角度必須要再配合第2齒與第3齒的轉速比加以轉換成第3齒輪的轉角, 因此乘上 n_g2/n_g3 ctx.rotate(-math.pi/2-math.pi/n_g3+(math.pi+math.pi/n_g2)*n_g2/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"#33FFDD\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#33FFDD\" ctx.font = \"20px Arial\" ctx.fillText(\"40423104 \",x_g3-25, y_g3) ctx.stroke() # 將第4齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g4, y_g4) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g4+(math.pi+math.pi/n_g3)*n_g3/n_g4*2) # put it back ctx.translate(-x_g4, -y_g4) Spur(ctx).Gear(x_g4, y_g4, rp_g4, n_g4, pa, \"#FFFF00\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#FFFF00\" ctx.font = \"20px Arial\" ctx.fillText(\"40423117 \",x_g4-25, y_g4) ctx.stroke() # 將第5齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g5, y_g5) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g5+(math.pi+math.pi/n_g4)*n_g4/n_g5*2) # put it back ctx.translate(-x_g5, -y_g5) Spur(ctx).Gear(x_g5, y_g5, rp_g5, n_g5, pa, \"#008800\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#008800\" ctx.font = \"20px Arial\" ctx.fillText(\"40423136 \",x_g5-25, y_g5) ctx.stroke() # 將第6齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g6, y_g6) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g6+(math.pi+math.pi/n_g5)*n_g5/n_g6*2) # put it back ctx.translate(-x_g6, -y_g6) Spur(ctx).Gear(x_g6, y_g6, rp_g6, n_g6, pa, \"#000088 \") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#000088\" ctx.font = \"20px Arial\" ctx.fillText(\"40423149 \",x_g6-25, y_g6) ctx.stroke() # 將第7齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g7, y_g7) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g7+(math.pi+math.pi/n_g6)*n_g6/n_g7) # put it back ctx.translate(-x_g7, -y_g7) Spur(ctx).Gear(x_g7, y_g7, rp_g7, n_g7, pa, \"#770077 \") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#770077 \" ctx.font = \"20px Arial\" ctx.fillText(\"40423157 \",x_g7-25, y_g7) ctx.stroke()","tags":"homework"},{"url":"./w12.html","title":"w12","text":"(11t-17t-13t)齒輪嚙合 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"onegear\" 的 canvas 中繪圖 canvas = doc[\"onegear\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 11 # 第2齒輪齒數 n_g2 = 17 # 第3齒輪齒數 n_g3 = 13 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.2+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"blue\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"green\") ctx.restore() # 將第3齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"blue\") ctx.restore()","tags":"homework"},{"url":"./期中報告.html","title":"期中報告","text":"1.利用solvespace進行點路徑的分析 2.用Excel進行點的分析 3.利用程式繪製路徑 (1)利用solvespace進行點路徑的分析 (2)用Excel進行點的分析 (3)利用程式繪製路徑 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math # 準備繪圖畫布 canvas = doc[\"fourbar\"] ctx = canvas.getContext(\"2d\") fourbar_data = open(\"./../data/40423101.csv\").read() fourbar_list = fourbar_data.splitlines() #container1 <= fourbar_list[0] # 以下可以利用 ctx 物件進行畫圖 # 先畫一條直線 ctx.beginPath() # 設定線的寬度為 1 個單位 ctx.lineWidth = 1 # 利用 transform 將 y 座標反轉, 且 offset canvas.height # (X scale, X skew, Y skew, Y scale, X offset, Y offset) # 配合圖形位置進行座標轉換 ctx.transform(1, 0, 0, -1, canvas.width/2+250, canvas.height/2+100) # 畫出 x 與 y 座標線 # 各座標值放大 3倍 ratio = 3 ctx.moveTo(0, 0) ctx.lineTo(-30*ratio, 0) start_point = fourbar_list[0].split(\",\") ctx.moveTo(float(start_point[0])*ratio, float(start_point[1])*ratio) count = 0 for data in fourbar_list[1:]: point = data.split(\",\") #count = count + 1 #container1 <= str(count) + \":\" + point[0] + \",\" + point[1] #container1 <= html.BR() ctx.lineTo(float(point[0])*ratio, float(point[1])*ratio) # 設定顏色為藍色, 也可以使用 \"rgb(0, 0, 255)\" 字串設定顏色值 ctx.strokeStyle = \"blue\" # 實際執行畫線 ctx.stroke() ctx.closePath() 小組作業 40423101負責組合 虎尾科技大學-機械設計系-40423101-ag2 組合 from 曾宜萱 on Vimeo .","tags":"homework"},{"url":"./W6.html","title":"第六周","text":"1.多連桿繪製 2.多連桿-組裝 多連桿繪製 多連桿繪製 from 曾宜萱 on Vimeo . 多連桿-組裝 多連桿組立 from 曾宜萱 on Vimeo .","tags":"homework"},{"url":"./W5.html","title":"第五周","text":"單連桿-匯入vrep做轉動模擬 單連桿-匯入vrep做轉動模擬 虎尾科技大學-機械設計系-40423101-單連桿-匯入vrep做轉動模擬 from 曾宜萱 on Vimeo . 心得 這次的轉動模擬看了很多次老師的影片終於學會了","tags":"homework"},{"url":"./W4.html","title":"第四周","text":"1.solvepace繪製單連桿 2.單連桿-匯入vrep 單連桿-零件1 單連桿-零件1 from 曾宜萱 on Vimeo . 單連桿-零件2 單連桿-零件2 from 曾宜萱 on Vimeo . 單連桿-零件3 單連桿-零件3 from 曾宜萱 on Vimeo . 單連桿-組裝 單連桿-組裝 from 曾宜萱 on Vimeo . 單連桿-匯入vrep 單連桿匯入vrep from 曾宜萱 on Vimeo .","tags":"homework"},{"url":"./W3.html","title":"第三周","text":"1.將多連桿匯入Vrep 2.Excel運算多連桿軌跡 3.翻譯Hyperworker影片 將多連桿匯入Vrep(solvespace) 將多連趕匯入Vrep from 曾宜萱 on Vimeo . 追蹤多連桿軌跡匯入Excel運算 trace 多連桿的一點 轉入 Excel運算 from 曾宜萱 on Vimeo . 將多連桿匯入Vrep(onshape) 將多連趕匯入Vrep(onshape) from 曾宜萱 on Vimeo . 翻譯Hyperworker1 In the 2017 release, we followed our vision and implement a lot more features, delivering more technology for your HyperWorks units investment. 在2017年版本中，我們遵循了我們的願景並實施了更多功能，為您的HyperWorks單位投資提供更多技術。 In our continuous development, we focused, as# always, on simulation-driven innovation, adding more optimization technology. 在我們的不斷發展中，我們一如既往地專注於模擬驅動的創新，增加更多的優化技術。 We added more physics simulation to the software, and we improved our parallel performance on high performance computers. 我們增加了許多的物理的模擬，我們提高了高性能電腦的平行性能。 OptiStruct, which is our implicit code, adds a lot of development in the nonlinear implicit area, but also in the optimization technology. OptiStruct是我們的隱式代碼，在非線性隱含區域中，也在優化技術中添加了很多開發。 RADIOSS, we see a lot of development in new materials and material modeling. RADIOSS，我們看到很多新材料和材料建模的發展。 You probably know that we did the acquisition of MDS a couple of years back, and we have now MDS integrated with RSDIOSS, and are doing application there. 您可能知道我們在幾年前就完成了MDS的收購，現在我們已經將MDS與RSDIOSS整合，並開始應用。 MotionSolve is based on a very unique formulation that this different from other multibody dynamics code, and the formulation lends itself very well to optimization implementation. MoMotionSolvetionSolve是根據一個非常獨特的公式，這不同於其他多體動力學代碼，MotionSolve公式本身非常好地優化實施。 So the team has worked really hard on contact formulations, got very robust. 因此團隊對於接觸公式非常努力，獲得了非常強大的。 It's very cool which kind of problems can solve with contact modelling. 這類型的問題可以解決與接觸建模這是非常酷的。 So this is along the structural solvers side on AcuSolve side we actually added the complete portfolio of turbulence and transition models that really helps us to solve problems in wind turbines and automotive industry much more accurately, and it's a big asset of physics simulation. 因此，這是沿著AcuSolve一側的結構解算方面，我們實際添加了完整的湍流和轉換模型組合，真正幫助我們更準確地解決風力渦輪機和汽車行業的問題，這是物理仿真的一個重要的資產。 And then our electromagnetic suite has actually grown last year through the acquisition of Flux, from the CEDRAT company. 然後，我們的電磁套件實際上是去年通過從CEDRAT公司收購Flux而實現的。 As well as the acquisition of WinProp, from AWE. 以及從AWE收購WinProp。 So now we have a complete frequency spectrum from low frequency electromagnetics the high frequency electromagnetics which is powered by FEKO. 所以現在我們有一個完整的頻譜從低頻電磁學的高頻電磁學由FEKO供電。 We now have a complete portfolio of physics modeling available for our customers, and it's all linked through optimization. 我們現在有一個完整的物理建模組合可用於我們的客戶，它都通過優化鏈接。 翻譯Hyperworker3 In OptiStruct, one of our focus areas is nonlinear large deformation analysis. 在OptiStruct中，我們的一個重點領域是非線性大變形分析。 And in 2017 we added nonlinear transient analysis. 在2017年，我們添加了非線性瞬態分析 The main purpose was to couple AcuSolve to do fluid-structure interaction. 主要目的是使AcuSolve與流體 - 結構相互作用。 But also one development that happened during the last year came out piece-wise in different point releases and is now really mature. 但是，在過去一年中發生的一個發展，在不同的積分發布中分段出現，現在已經成熟。 And 2017 is our contact analysis, so we have different ways of defining sliding contact and things like that. 2017年是我們的接觸分析，所以我們有不同的方式來定義滑動接觸和類似的東西。 The fast contact analysis for small deformation is blazing fast. 對小變形的快速接觸分析是快速的。 It's a very simple idea that makes the solution very fast, and that adds OptiStruct as really a leading nonlinear structural solver. 這是一個非常簡單的想法，使解決方案非常快，並將OptiStruct添加為真正的領先的非線性結構求解器。 Our two major optimization packages are OptiStruct for structural optimization, there's a huge multidisciplinary component, too. 我們的兩個主要優化包是用於結構優化的OptiStruct，還有一個巨大的多學科組件。 And Hyperstudy for general optimization wrap around multidisciplinary optimization. 並且Hyperstudy對一般優化包圍多學科優化。 [For] OptiStruct we spend a lot of time continuing the development for optimization and we have now Failsafe topology optimization. [For] OptiStruct我們花了很多時間繼續開發優化，我們現在已經失效的拓撲優化。 We kept on working on the manufacturing solution to do lattice optimization. 我們一直在製造解決方案上做晶格優化。 For the multi-model optimization it's really maturing and we find more and more applications where that helps. 對於多模型優化，它真的成熟，我們發現越來越多的應用程序，這有助於。 Our goal is actually to include all the physics in the optimizations. 我們的目標實際上是在優化中包括所有的物理。 So the team right now is working on optimization for nonlinear problems and so on. 所以團隊現在正在努力優化非線性問題等等。 And then Hyperstudy, on the other hand, is going through a new transformation of the user the user experience was changed a few years back, but we are now trying to make it much more easy to use by hiding a lot of the advanced functionalities to the regular users. 另一方面，Hyperstudy正在經歷用戶體驗在幾年前改變的用戶體驗的一個新的轉變，但是我們現在試圖通過隱藏許多高級功能來使它更容易使用 普通用戶。 And depending on the level of expertise or depending on the job that the user has to do, they can customize the user experience. 並且取決於專業水平或者根據用戶必須做的工作，他們可以定制用戶體驗。 We adds a few new connections. 我們添加了一些新的連接。 One of them is a Flux connection. 其中一個是Flux連接。 Flux is an electromagnetics code that we just acquired for low frequency electromagnetics, so we can all take a Flux database and put it into Hyperstudy into the study with that. Flux是我們剛剛為低頻電磁學採集的電磁學代碼，所以我們可以採用一個Flux數據庫，並把它放入Hyperstudy進行研究。 心得 這次要翻譯字幕查了很多單字，也學到了很多字，讓自己更有耐心看英文","tags":"homework"},{"url":"./W2.html","title":"第二周","text":"1.solvepace30,50,60連桿繪製 2.solvepace組合零件 solvepace零件繪製 30mmbar Bar(30mm) from 曾宜萱 on Vimeo . 50mmbar Bar(50mm) from 曾宜萱 on Vimeo . 60mmbar Bar(60mm) from 曾宜萱 on Vimeo . 繪製連桿位置 Bar(路徑) from 曾宜萱 on Vimeo . 多連桿組立 Bar(組立) from 曾宜萱 on Vimeo . 心得 雖然上學期就開始使用solvespace,但還是有許多功能是我還沒學過的,這次上課學到chord tolerance是調整圓的平滑度","tags":"homework"},{"url":"./W1.html","title":"第一周","text":"1.onshape30,50,60連桿繪製 2.onshape組合零件 onshape零件繪製 30mmbar 30mmbar(onshape) from 曾宜萱 on Vimeo . 50mmbar 50mmbar(onshape) from 曾宜萱 on Vimeo . 60mmbar 60mmbar(onshape) from 曾宜萱 on Vimeo . 多連桿組立 多連趕組合(onshape) from 曾宜萱 on Vimeo . 心得 這是第一次使用onshape組合零件,一開始真的很不習慣指令的方式,點跟點使用了緊密配合所以一動也不動,後來發現要用轉動配合,使用後連桿就可以移動了","tags":"homework"}]};