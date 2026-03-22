document.getElementById('retry-btn').addEventListener('click', function() {
    this.innerText = '嘗試連線中...';
    this.style.opacity = '0.7';
    
    // 模擬檢查伺服器的延遲
    setTimeout(() => {
        alert('伺服器依然忙碌，請再等一下！');
        this.innerText = '嘗試重新連接';
        this.style.opacity = '1';
    }, 1500);
});