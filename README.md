# SnakeGame-DBA
SnakeGame

產品企劃書：Super Snake Bros.（瑪利歐風格貪吃蛇）
1. 產品概述 (Product Overview)
本專案旨在結合經典「貪吃蛇（Snake）」的核心玩法與《Super Mario》的視覺、音效與道具機制。玩家將操控瑪利歐（或綠色耀西 Yoshi）在經典蘑菇王國（Mushroom Kingdom）地圖中遊走，吞食各式道具並讓隊伍變長，同時避開障礙物與經典敵人。

2. 核心遊戲機制 (Core Gameplay Mechanics)
角色與身軀（Snake & Tail）：
蛇頭： 瑪利歐（或耀西）。
蛇身： 每吃到一個菇類或道具，身後會增加一個跟隨的成員（例如：綠耀西尾巴、奇諾比奧 Toad、金幣陣列）。
控制方式：
鍵盤方向鍵（Up, Down, Left, Right）或 WASD 控制移動方向。
不可直接逆向回頭（例如往右走時不能直接按左）。
得分與死亡判定：
得分： 吃到金幣或道具可獲得分數。
失敗條件： 撞到邊界（牆壁/水管）、撞到自己的尾巴、或撞到障礙敵人（如庫巴/栗寶寶）。

3. 《Super Mario》特色道具機制 (Power-ups & Items)
地圖上會隨機刷出不同的經典瑪利歐道具，帶來不同的遊戲效果：
道具名稱	外觀視覺	效果描述
超級蘑菇 (Super Mushroom)	紅色蘑菇	基本食物：身長 +1，分數 +100。
無敵星 (Super Star)	黃色閃爍星星	短暫無敵狀態（5-8 秒）：可直接撞碎邊界或敵人，移動速度小幅加快。
毒蘑菇 (Poison Mushroom)	紫色蘑菇	懲罰道具：身長 -1（若長度為 1 則直接 Game Over），分數 -50。
火之花 (Fire Flower)	紅黃花朵	獲得短暫遠程攻擊能力（可按 Space 鍵發射 3 發火球清除前方障礙）。
超級金幣 (Coin)	閃爍金幣	額外加分（分數 +300），不增加身體長度。

4. 視覺與音效風格 (Art & Audio Style)
視覺美術 (Visuals)
畫風： 經典 8-bit / 16-bit 像素風格（Pixel Art）。
背景主題（Maps）：
平原世界 (World 1-1)： 經典藍天白雲與綠色草地地圖。
地下世界 (Underground)： 深藍/黑色背景，磚塊邊界。
動畫細節： 吃到無敵星時，蛇身會發出彩虹閃爍光芒。
音效與音樂 (Audio)
背景音樂 (BGM)： 經典 8-bit Overworld 主題曲（吃到無敵星時切換為無敵星 BGM）。
音效 (SFX)：
吃蘑菇/金幣：瑪利歐吃道具音效（Powerup / Coin SFX）。
遊戲失敗：瑪利歐死亡音效（Lose Life / Game Over SFX）。
發射火球：Fireball SFX。

5. 技術規格建議 (Technical Stack Recommendation)
適合初學者或快速開發的網頁端實作方案：
前端語言： HTML5, CSS3, JavaScript (ES6+)
繪圖渲染： HTML5 <canvas> API（適合像素畫風呈現）
開發框架（可選）： Phaser.js（若想更輕鬆處理音效、碰撞偵測與動態 Sprite）

6. MVP（最小可行性產品）開發階段規劃
Phase 1（基礎框架）：
實現基本 Canvas 畫布與網格（Grid）。
完成貪吃蛇移動、鍵盤控制與邊界碰撞偵測。
Phase 2（瑪利歐主題化）：
替換像素 Sprite（瑪利歐頭像、蘑菇、磚塊牆壁）。
加入基本音效（吃蘑菇、Game Over）。
Phase 3（特殊道具與效果）：
加入無敵星與火之花機制。
加入得分板（Scoreboard）與最高分紀錄（High Score）
 


