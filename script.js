const quotes = [
    "勇者正在與史萊姆戰鬥...",
    "正在嘗試說服伺服器起床工作...",
    "法力值恢復中，請稍候...",
    "正在前往巴哈大地圖尋找維修工...",
    "別擔心，你的巴幣不會因為當機而消失。"
];

document.getElementById('retry-btn').addEventListener('click', function() {
    const statusText = document.getElementById('status-text');
    const hpFill = document.getElementById('hp-fill');
    
    this.disabled = true;
    this.innerText = '吟唱咒文中...';
    
    // 隨機變更提示文字
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    statusText.innerText = randomQuote;

    // 模擬 HP 條跳動
    const randomHP = Math.floor(Math.random() * 80) + 10;
    hpFill.style.width = randomHP + '%';

    setTimeout(() => {
        alert('召喚失敗！伺服器防禦力過高，請稍後再試。');
        this.disabled = false;
        this.innerText = '施放「大復活術」重新連線';
    }, 2000);
});