const fs = require('fs');

const rawTOC = `
1 Dãy số
1.1 Khái niệm dãy số thực
1.2 Dãy số hội tụ
1.3 Các tính chất của dãy số hội tụ
1.4 Sự hội tụ của dãy số đơn điệu
1.5 Tiêu chuẩn hội tụ Cauchy
1.6.1 Dạng 1: Tính giới hạn của dãy số
1.6.2 Dạng 2: Chứng minh giới hạn bằng định nghĩa
1.6.3 Dạng 3: Xét sự hội tụ và tính giới hạn của dãy truy hồi
1.6.4 Dạng 4: Xét sự hội tụ của dãy số theo tiêu chuẩn Cauchy
2 Hàm số
2.1.1 Định nghĩa hàm số
2.1.2 Các tính chất của hàm số
2.2.1 Sự liên tục của hàm số
2.2.2 Điểm gián đoạn và phân loại
2.3 Định nghĩa giới hạn của hàm số
2.4.1 Quy tắc L’Hôpital
2.4.2 Sử dụng vô cùng bé (VCB)
2.4.3 Sử dụng vô cùng lớn (VCL)
2.4.4 Các dạng vô định 1^vcv, 0^0, vcv^0
2.4.5 Khai triển Maclaurin
2.5.1 Dạng 1: Tính giới hạn của hàm số
2.5.2 Dạng 2: Chứng minh giới hạn bằng định nghĩa
2.5.3 Dạng 3: Tìm và phân loại điểm gián đoạn
2.5.4 Dạng 4: Tìm tham số để hàm số liên tục
3 Đạo hàm và vi phân
3.1.1 Định nghĩa và tính chất
3.1.2 Ý nghĩa của đạo hàm
3.1.3 Đạo hàm một bên
3.1.4 Đạo hàm hàm ngược và hàm tham số hóa
3.1.5 Đạo hàm cấp cao
3.1.6 Vi phân cấp 1
3.1.7 Vi phân cấp cao
3.2 Quy tắc L’Hôpital
3.3.1 Công thức khai triển (Taylor & Maclaurin)
3.3.2 Ứng dụng quan trọng của khai triển Taylor và Maclaurin
3.4.1 Dạng 1: Tính các giới hạn sau bằng quy tắc L’Hôpital, VCB tương đương hoặc khai triển
3.4.2 Dạng 2: Tính đạo hàm cấp cao bằng công thức Leibniz hoặc khai triển Taylor
3.4.3 Dạng 3: Xét sự tồn tại của đạo hàm tại một điểm
3.4.4 Dạng 4: Ứng dụng vi phân tính gần đúng
3.4.5 Dạng 5: Tính đạo hàm hàm ngược
4 Nguyên hàm và tích phân
4.1.1 Định nghĩa và bảng nguyên hàm cơ bản
4.1.2 Các phương pháp tính tích phân
4.2.1 Định nghĩa và công thức Newton-Leibniz
4.2.2 Các tính chất cơ bản
4.3.1 Định nghĩa và phân loại (Tích phân suy rộng)
4.3.2 Các tiêu chuẩn xét sự hội tụ
4.3.3 Hội tụ tuyệt đối
4.4.1 Tính diện tích hình phẳng
4.4.2 Tính thể tích vật thể tròn xoay
4.4.3 Tính độ dài cung phẳng
4.4.4 Tính diện tích mặt tròn xoay
4.5.1 Dạng 1: Tính tích phân bất định và xác định
4.5.2 Dạng 2: Tính tích phân suy rộng
4.5.3 Dạng 3: Xét sự hội tụ/phân kỳ của tích phân
5 Chuỗi số
5.1.1 Định nghĩa và các chuỗi cơ bản
5.1.2 Các chuỗi số cơ bản và minh họa
5.1.3 Các tiêu chuẩn xét sự hội tụ (cho chuỗi dương)
5.2.1 Chuỗi đan dấu
5.2.2 Hội tụ tuyệt đối và bán hội tụ
5.2.3 Đại cương về chuỗi hàm
5.3.1 Định nghĩa, bán kính và miền hội tụ
5.3.2 Khai triển Taylor và Maclaurin
5.4.1 Dạng 1: Xét sự hội tụ/phân kỳ của chuỗi số
5.4.2 Dạng 2: Tìm miền hội tụ của chuỗi lũy thừa
5.4.3 Dạng 3: Khai triển Taylor và tính tổng chuỗi
6 Ma trận
6.1.1 Hai ma trận bằng nhau
6.1.2 Phép cộng và trừ ma trận
6.1.3 Nhân vô hướng
6.1.4 Nhân hai ma trận
6.1.5 Ma trận chuyển vị và các loại ma trận đặc biệt
6.2.1 Các phép biến đổi sơ cấp trên dòng
6.2.2 Ma trận nghịch đảo
6.3.1 Dạng 1: Các phép toán cơ bản và phương trình ma trận
6.3.2 Dạng 2: Lũy thừa ma trận và quy nạp toán học
7 Định thức
7.1.1 Cách tính định thức cấp 1, 2 và 3
7.1.2 Khai triển Laplace (Tính định thức cấp n)
7.2 Tính chất của định thức và phép biến đổi sơ cấp
7.3 Ma trận nghịch đảo và định thức
7.4.1 Dạng 1: Tính định thức bằng định nghĩa và khai triển
7.4.2 Dạng 2: Tính chất của định thức
7.4.3 Dạng 3: Biện luận điều kiện khả nghịch của ma trận
7.4.4 Dạng 4: Tìm ma trận nghịch đảo bằng định thức
8 Hệ phương trình tuyến tính
8.1 Định nghĩa và định lý Kronecker-Capelli
8.2 Hệ Cramer
8.3 Hệ phương trình tuyến tính thuần nhất
8.4.1 Dạng 1: Giải hệ phương trình tuyến tính tổng quát
8.4.2 Dạng 2: Biện luận hệ phương trình theo tham số
9 Ma trận nghịch đảo
9.1 Định nghĩa và tính chất
9.2 Tìm ma trận nghịch đảo bằng định thức
9.3 Tìm ma trận nghịch đảo bằng phương pháp Gauss-Jordan
9.4 Phương trình ma trận
9.5.1 Dạng 1: Tìm ma trận nghịch đảo
9.5.2 Dạng 2: Ma trận chứa tham số và biện luận khả nghịch
10 Không gian vector
10.1 Định nghĩa và không gian vector con
10.2 Tổ hợp tuyến tính và sự độc lập tuyến tính
10.3 Hạng của hệ vector
10.4 Cơ sở, số chiều và tọa độ của vector
10.5 Ma trận chuyển cơ sở
10.6.1 Dạng 1: Kiểm tra không gian vector
10.6.2 Dạng 2: Kiểm tra không gian vector con
10.6.3 Dạng 3: Xét tổ hợp tuyến tính và sự độc lập tuyến tính
10.6.4 Dạng 4: Tìm hạng của hệ vector
10.6.5 Dạng 5: Tìm cơ sở, số chiều và tọa độ
10.6.6 Dạng 6: Tìm ma trận chuyển cơ sở
11 Không gian Euclide
11.1 Tích vô hướng và không gian Euclide
11.2 Độ dài, khoảng cách và góc
11.3 Phần bù trực giao của không gian con
11.4 Sự trực giao và trực giao hóa Gram-Schmidt
11.5 Hình chiếu vuông góc
11.6.1 Dạng 1: Kiểm tra tính chất tích vô hướng
11.6.2 Dạng 2: Tính độ dài, khoảng cách và góc
11.6.3 Dạng 3: Tìm phần bù trực giao của không gian con
11.6.4 Dạng 4: Trực giao hóa Gram-Schmidt
11.6.5 Dạng 5: Tìm hình chiếu trực giao và khoảng cách
12 Ánh xạ tuyến tính
12.1 Định nghĩa và tính chất cơ bản
12.2 Nhân và ảnh của ánh xạ tuyến tính
12.3 Ma trận của ánh xạ tuyến tính
12.4.1 Dạng 1: Chứng minh ánh xạ tuyến tính
12.4.2 Dạng 2: Tìm cơ sở và số chiều của nhân và ảnh
12.4.3 Dạng 3: Tìm ma trận của ánh xạ tuyến tính
13 Trị riêng và vector riêng
13.1 Định nghĩa và phương pháp tìm
13.2 Trị riêng và vector riêng của ánh xạ tuyến tính
13.3 Chéo hóa ma trận
13.4 Chéo hóa ma trận đối xứng thực bằng ma trận trực giao
13.5 Chéo hóa ánh xạ tuyến tính
13.6.1 Dạng 1: Tìm trị riêng và vector riêng
13.6.2 Dạng 2: Chéo hóa ma trận
14 Ứng dụng của toán học trong CNTT
14.1 Ma trận trong xử lý ảnh (Thị giác máy tính)
14.2 Lý thuyết đồ thị và hệ thống gợi ý
14.3 Giải tích trong đồ họa 3D và mô hình hóa
14.4 Phương pháp số và giải thuật tính toán
15 Đề thi tham khảo
15.1 Đề số 1: Học kỳ I (2022-2023)
15.2 Đề số 2: Học kỳ I (2023-2024)
15.3 Đề số 3: Học kỳ I (2024-2025)
15.4 Đề số 4: Học kỳ I (2025-2026)
`;

const getSubject = (chap) => {
    if (chap <= 5) return "Giải tích 1";
    if (chap >= 6 && chap <= 13) return "Đại số tuyến tính";
    if (chap === 14) return "Ứng dụng trong CNTT";
    return "Đề thi & Ôn tập";
};

const getType = (title) => {
    title = title.toLowerCase();
    if (title.includes("dạng") || title.includes("giải")) return "Dạng bài tập";
    if (title.includes("định nghĩa") || title.includes("khái niệm") || title.includes("đại cương")) return "Khái niệm";
    if (title.includes("tính chất") || title.includes("cơ bản")) return "Tính chất";
    if (title.includes("công thức") || title.includes("quy tắc")) return "Công thức";
    if (title.includes("đề thi") || title.includes("đề số")) return "Đề thi";
    return "Kiến thức chung";
};

// Generic content generators based on subject/type
const generateContent = (title, subject) => {
    if (title.toLowerCase().includes("hội tụ")) {
        return "Sự hội tụ là một trong những khái niệm nền tảng. Khi xét giới hạn hay chuỗi số, sự hội tụ đảm bảo rằng quá trình lặp hay tổng vô hạn sẽ tiến dần về một giá trị hữu hạn xác định $L$. Công thức tổng quát thường liên quan đến $\\lim_{n \\to \\infty} S_n = L$ với $|S_n - L| < \\epsilon$.";
    }
    if (title.toLowerCase().includes("đạo hàm")) {
        return "Đạo hàm mô tả sự biến thiên của hàm số tại một điểm: $f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$. Nó được ứng dụng rất nhiều trong việc dò tìm cực trị và phương pháp tối ưu hóa (Gradient Descent) trong Machine Learning.";
    }
    if (title.toLowerCase().includes("ma trận")) {
        return "Ma trận $A = (a_{ij})_{m \\times n}$ là công cụ quan trọng để biểu diễn hệ phương trình, đồ thị lượng giác và các phép toán biến đổi hình học (Scale, Rotation, Translation). Khả nghịch khi $\\det(A) \\neq 0$.";
    }
    if (title.toLowerCase().includes("định nghĩa") || title.toLowerCase().includes("khái niệm")) {
        return "Đây là nền tảng lý thuyết cơ bản (Khái niệm & Định nghĩa) của nội dung bài học. Nắm vững điều này sẽ giúp giải quyết các dạng bài tập phân loại. Vận dụng định ngiã một cách linh hoạt là cốt lõi của môn học Giải tích / Đại số.";
    }
    if (title.toLowerCase().includes("dạng")) {
        return "Phương pháp giải chung: \n1. Đọc kỹ đề bài và đối chiếu lý thuyết.\n2. Biến đổi công thức (rút gọn, thế tham số, khử các dạng vô định hoặc đưa về ma trận bậc thang).\n3. Tổ hợp kết quả và kết luận bài toán.\nVD: Nếu tính giới hạn hãy dùng L'Hopital $\\frac{0}{0}$.";
    }
    if (title.toLowerCase().includes("đề thi")) {
        return "Đề thi gồm các câu hỏi tự luận nhằm kiểm tra đánh giá 2 mảng Kiến thức:\n- Giải tích 1 (Công thức Taylor, Tích phân suy rộng)\n- Đại số (Tìm cơ sở, Ma trận chuyển cơ sở, Chéo hóa, Khả nghịch).\nHãy ôn tập kỹ các lý thuyết và bài tập ở các chương trên.";
    }

    return "Nội dung chi tiết của phần kiến thức này nằm trong giáo trình môn Cơ sở Toán trong CNTT. Để nắm vững tư duy ứng dụng, sinh viên cần làm bài tập và nhớ các công thức đạo hàm, tích phân, cũng như xử lý biến đổi dòng ma trận sơ cấp.";
};

const lines = rawTOC.trim().split('\n');
const data = [];
let currentChapter = "";
let currentChapNum = 0;

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    const parts = line.split(' ');
    const idStr = parts[0];
    const isChapter = idStr.indexOf('.') === -1 && !idStr.includes('Dạng') && !isNaN(parseInt(idStr));
    
    if (isChapter) {
        currentChapNum = parseInt(idStr);
        currentChapter = line.replace(idStr, '').trim(); // "Dãy số"
    } else {
        // It's a section
        const title = line.replace(idStr, '').trim();
        const item = {
            id: `sec-${idStr.replace(/\./g, '-')}`,
            subject: getSubject(currentChapNum),
            lesson: `Chương ${currentChapNum}: ${currentChapter}`,
            type: getType(title),
            title: title || line, // If title empty, use whole line
            content: generateContent(title, getSubject(currentChapNum)),
            related_ids: []
        };
        data.push(item);
    }
}

// Chạy lại gán related_ids cho các items gần đó
data.forEach((item, index) => {
    if (index > 0) item.related_ids.push(data[index - 1].id);
    if (index < data.length - 1) item.related_ids.push(data[index + 1].id);
});

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log(`Đã tạo data.json với ${data.length} mục kiến thức.`);
