const fs = require('fs');

try {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let changes = 0;
    
    data.forEach(item => {
        if (item.pdf && typeof item.pdf === 'string') {
            if (item.pdf.startsWith('/pdfs/')) {
                item.pdf = item.pdf.substring(1); // Xóa dấu / ở đầu 
                changes++;
            }
        }
    });

    if (changes > 0) {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log(`Đã sửa ${changes} đường dẫn PDF thành dạng tương đối (bỏ dấu /).`);
    } else {
        console.log("Không tìm thấy đường dẫn PDF nào bắt đầu bằng /pdfs/ (có thể đã được sửa trước đó).");
    }
} catch (err) {
    console.error("Lỗi:", err);
}
