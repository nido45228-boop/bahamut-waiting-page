// --- 🕹️ 史萊姆小遊戲邏輯 ---
let killCount = 0;
let currentSlimeHP = 100;
const slimeMaxHP = 100;

const slimeEl = document.getElementById('slime');
const slimeHPEl = document.getElementById('slime-hp');
const killCountEl = document.getElementById('kill-count');

// 點擊史萊姆進行攻擊
slimeEl.addEventListener('click', function() {
    if (this.classList.contains('slime-die')) return;

    currentSlimeHP -= 25; // 加強攻擊力，點4下就死

    let hpPercentage = (currentSlimeHP / slimeMaxHP) * 100;
    // 確保血條不會小於 0%
    slimeHPEl.style.width = Math.max(0, hpPercentage) + '%';

    // 攻擊受擊動畫
    slimeEl.classList.remove('slime-hit');
    void slimeEl.offsetWidth; // 強制重繪，讓動畫能重複觸發
    slimeEl.classList.add('slime-hit');

    if (currentSlimeHP <= 0) {
        slimeDeath();
    }
});

function slimeDeath() {
    killCount++;
    killCountEl.innerText = killCount;

    slimeEl.classList.remove('slime-hit');
    slimeEl.classList.add('slime-die');

    // 修正：300ms 後史萊姆大復活，這裡要寫數字 300
    setTimeout(() => {
        slimeEl.classList.remove('slime-die');
        currentSlimeHP = slimeMaxHP; 
        slimeHPEl.style.width = '100%'; 
    }, 300);
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