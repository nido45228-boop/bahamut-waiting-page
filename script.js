document.getElementById('retry-btn').addEventListener('click', function() {
    const btn = this;
    
    // 1. 模擬正在與伺服器通訊
    btn.disabled = true;
    btn.innerText = '正在召喚中...';
    
    // 2. 隨機成功/失敗機制 (增加不確定感，化解固定等待的焦慮)
    const randomTime = Math.floor(Math.random() * 2000) + 1000; // 1-3秒

    setTimeout(() => {
        // 模擬大多數情況都會失敗
        if (Math.random() < 0.1) {
            // 極小機率成功 (通常不應該成功，因為是等待頁面，但加一點點希望)
            alert('天啊！召喚成功！正在進入伺服器...');
            btn.innerText = '召喚成功！';
            btn.style.backgroundColor = '#4CAF50';
        } else {
            // 失敗，告訴使用者原因
            alert('召喚失敗！伺服器防禦力過高，或有野生的魔物阻擋連線。');
            
            // 3. 進入冷卻時間 (冷卻也是一種遊戲元素)
            let cooldown = 10;
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