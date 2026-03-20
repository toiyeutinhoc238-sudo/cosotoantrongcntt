const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const pdfs = [
    {
        id: "pdf-hpttt",
        subject: "Đại số tuyến tính",
        lesson: "Chương 8: Hệ phương trình tuyến tính",
        type: "Tài liệu PDF",
        title: "Bài tập Hệ phương trình tuyến tính",
        content: "File PDF đính kèm chứa các dạng bài tập thực hành về giải và biện luận hệ phương trình tuyến tính (Cramer, Kronecker-Capelli).",
        pdf: "/pdfs/BT_HPTTT.pdf",
        related_ids: []
    },
    {
        id: "pdf-hang",
        subject: "Đại số tuyến tính",
        lesson: "Chương 10: Không gian vector",
        type: "Tài liệu PDF",
        title: "Bài tập Hạng của ma trận",
        content: "Tài liệu PDF các bài tập chuyên đề về tìm hạng của ma trận và hạng của hệ vector.",
        pdf: "/pdfs/BT_Hạng.pdf",
        related_ids: []
    },
    {
        id: "pdf-matran",
        subject: "Đại số tuyến tính",
        lesson: "Chương 6: Ma trận",
        type: "Tài liệu PDF",
        title: "Bài tập Ma trận",
        content: "Tổng hợp bài tập các phép toán trên ma trận, ma trận chuyển vị và lũy thừa ma trận.",
        pdf: "/pdfs/BT_Ma trận.pdf",
        related_ids: []
    },
    {
        id: "pdf-nghichdao",
        subject: "Đại số tuyến tính",
        lesson: "Chương 9: Ma trận nghịch đảo",
        type: "Tài liệu PDF",
        title: "Bài tập Ma trận nghịch đảo",
        content: "Các dạng bài tập tìm ma trận nghịch đảo bằng phương pháp Gauss-Jordan và phương pháp phần bù đại số (định thức).",
        pdf: "/pdfs/BT_Nghịch đảo.pdf",
        related_ids: []
    },
    {
        id: "pdf-dinhthuc",
        subject: "Đại số tuyến tính",
        lesson: "Chương 7: Định thức",
        type: "Tài liệu PDF",
        title: "Bài tập Định thức",
        content: "Hệ thống bài tập biến đổi sơ cấp để tính định thức và sử dụng khai triển Laplace cho ma trận cấp cao.",
        pdf: "/pdfs/BT_Định thức.pdf",
        related_ids: []
    }
];

// Add related links to some adjacent knowledge items if possible
// We will just append them to the main array.

// Push to main data
data = data.concat(pdfs);

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Added 5 PDFs to data.json');
