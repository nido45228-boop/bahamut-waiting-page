// --- ⚙️ 遊戲設定區 ---
const aliveSlimeSrc = 'slime.png';       // 活著的史萊姆圖案
const deadSlimeSrc  = 'slime_dead.png';  // ⚠️ 這裡換成你找好的「消滅圖」檔名

// --- 🔊 音量設定 (0.0 到 1.0) ---
const HIT_VOLUME = 0.1; // 攻擊音量 (20%)
const DIE_VOLUME = 0.2; // 死亡音量 (30%)

// --- 🎮 變數與元件初始化 ---
let killCount = 0;
let currentSlimeHP = 100;
const slimeMaxHP = 100;

const slimeEl = document.getElementById('slime');
const slimeImgEl = slimeEl.querySelector('img'); // 取得裡面的圖片標籤
const slimeHPEl = document.getElementById('slime-hp');
const killCountEl = document.getElementById('kill-count');

const sndHit = document.getElementById('snd-hit');
const sndDie = document.getElementById('snd-die');

// 套用音量設定
if (sndHit) sndHit.volume = HIT_VOLUME;
if (sndDie) sndDie.volume = DIE_VOLUME;

// --- 🕹️ 核心邏輯 ---

// 1. 點擊史萊姆進行攻擊
slimeEl.addEventListener('click', function() {
    // 防呆：如果史萊姆正在死亡動畫中，不重複計算
    if (this.classList.contains('slime-die')) return;

    // 播放攻擊音效
    if (sndHit) {
        sndHit.currentTime = 0;
        sndHit.play().catch(e => console.log("音效播放被攔截"));
    }

    // 扣血邏輯
    currentSlimeHP -= 25; 
    let hpPercentage = (currentSlimeHP / slimeMaxHP) * 100;
    slimeHPEl.style.width = Math.max(0, hpPercentage) + '%';

    // 受擊抖動動畫
    slimeEl.classList.remove('slime-hit');
    void slimeEl.offsetWidth; // 強制重繪
    slimeEl.classList.add('slime-hit');

    // 判斷是否消滅
    if (currentSlimeHP <= 0) {
        slimeDeath();
    }
});

// 2. 處理消滅邏輯
function slimeDeath() {
    killCount++;
    killCountEl.innerText = killCount;

    // 播放死亡音效
    if (sndDie) {
        sndDie.currentTime = 0;
        sndDie.play().catch(e => console.log("音效播放被攔截"));
    }

    // 🖼️ 更換成消滅圖
    if (slimeImgEl) {
        slimeImgEl.src = deadSlimeSrc;
    }

    // 觸發消失動畫
    slimeEl.classList.add('slime-die');

    // 史萊姆大復活邏輯
    setTimeout(() => {
        // 🖼️ 換回原本的圖
        if (slimeImgEl) {
            slimeImgEl.src = aliveSlimeSrc;
        }

        // 重設狀態
        slimeEl.classList.remove('slime-die');
        currentSlimeHP = slimeMaxHP; 
        slimeHPEl.style.width = '100%'; 
    }, 400); // 這裡設定 400ms，稍微留一點時間看消滅圖
}

// --- 🔗 重新連線按鈕邏輯 (維持原樣) ---
document.getElementById('retry-btn').addEventListener('click', function() {
    const btn = this;
    btn.disabled = true;
    btn.innerText = '正在召喚中...';
    
    const randomTime = Math.floor(Math.random() * 1500) + 1000;

    setTimeout(() => {
        if (Math.random() < 0.05) { 
            alert('召喚成功！正在進入伺服器...');
            btn.innerText = '召喚成功！';
            btn.style.backgroundColor = '#4CAF50';
        } else {
            alert('召喚失敗！史萊姆太多了阻擋了路徑。');
            let cooldown = 5;
            const cooldownInterval = setInterval(() => {
                btn.innerText = `法力不足 (${cooldown}s)`;
                cooldown--;
                if (cooldown < 0) {
                    clearInterval(cooldownInterval);
                    btn.disabled = false;
                    btn.innerText = '重新召喚伺服器';
                    btn.style.backgroundColor = '#FF8800';
                }
            }, 1000);
        }
    }, randomTime);
});