// --- 🕹️ 史萊姆小遊戲邏輯 (音效修復版) ---
let killCount = 0;
let currentSlimeHP = 100;
const slimeMaxHP = 100;

const slimeEl = document.getElementById('slime');
const slimeHPEl = document.getElementById('slime-hp');
const killCountEl = document.getElementById('kill-count');

// 取得音效元件
const sndHit = document.getElementById('snd-hit');
const sndDie = document.getElementById('snd-die');

// --- 🔊 設定音量 (範圍是 0.0 到 1.0) ---
sndHit.volume = 0.3; // 設定為 30% 音量 (原本是 1.0)
sndDie.volume = 0.4; // 設定為 40% 音量

// 點擊史萊姆進行攻擊
slimeEl.addEventListener('click', function() {
    if (this.classList.contains('slime-die')) return;

    // --- 【新增：音效播放邏輯】 ---
    if (sndHit) {
        sndHit.currentTime = 0; // 強制回到 0 秒，這樣連點才會有聲音
        sndHit.play().catch(e => console.log("音效播放被瀏覽器攔截:", e));
    }

    currentSlimeHP -= 25; 
    let hpPercentage = (currentSlimeHP / slimeMaxHP) * 100;
    slimeHPEl.style.width = Math.max(0, hpPercentage) + '%';

    // 攻擊動畫
    slimeEl.classList.remove('slime-hit');
    void slimeEl.offsetWidth; 
    slimeEl.classList.add('slime-hit');

    if (currentSlimeHP <= 0) {
        slimeDeath();
    }
});

function slimeDeath() {
    if (sndDie) {
        sndDie.currentTime = 0;
        sndDie.play().catch(e => console.error("播放失敗:", e));
    }

    // 擊殺數加一
    killCount++;
    killCountEl.innerText = killCount;

    // 確保血條歸零
    slimeHPEl.style.width = '0%';

    // 史萊姆消失動畫
    slimeEl.classList.add('slime-die');

    setTimeout(() => {
        slimeEl.classList.remove('slime-die');
        currentSlimeHP = slimeMaxHP; 
        slimeHPEl.style.width = '100%'; // 重生補滿
    }, 400);
}


// --- 🔗 重新連線按鈕邏輯 ---
document.getElementById('retry-btn').addEventListener('click', function() {
    const btn = this;
    btn.disabled = true;
    btn.innerText = '正在召喚中...';
    
    // 縮短一點隨機時間 (1-2.5秒)
    const randomTime = Math.floor(Math.random() * 1500) + 1000;

    setTimeout(() => {
        // 大幅調低成功率 (通常是連不上的，呵呵)
        if (Math.random() < 0.05) { 
            alert('召喚成功！正在進入伺服器...');
            btn.innerText = '召喚成功！';
            btn.style.backgroundColor = '#4CAF50';
        } else {
            alert('召喚失敗！史萊姆太多了阻擋了路徑。');
            
            // 進入冷卻時間 (冷卻縮短到 5 秒)
            let cooldown = 5;
            const cooldownInterval = setInterval(() => {
                btn.innerText = `法力不足 (${cooldown}s)`;
                cooldown--;
                
                if (cooldown < 0) {
                    clearInterval(cooldownInterval);
                    btn.disabled = false;
                    btn.innerText = '重新召喚伺服器';
                    btn.style.backgroundColor = '#FF8800'; // 恢復橘色
                }
            }, 1000);
        }
    }, randomTime);
});