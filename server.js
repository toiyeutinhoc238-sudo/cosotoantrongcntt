const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Đọc dữ liệu từ data.json
let database = [];
try {
    const rawdata = fs.readFileSync(path.join(__dirname, 'data.json'));
    database = JSON.parse(rawdata);
} catch (error) {
    console.error("Lỗi đọc dữ liệu json:", error);
}

// API: Lấy danh sách + Tìm kiếm + Lọc
app.get('/api/knowledge', (req, res) => {
    let result = database;
    const { q, subject, type, lesson } = req.query;

    if (q) {
        const query = q.toLowerCase();
        result = result.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query) ||
            item.lesson.toLowerCase().includes(query)
        );
    }
    
    if (subject) {
        result = result.filter(item => item.subject === subject);
    }
    
    if (type) {
        result = result.filter(item => item.type === type);
    }

    if (lesson) {
        result = result.filter(item => item.lesson === lesson);
    }

    res.json(result);
});

// API: Lấy các metadata chung để build danh sách filter trên giao diện
app.get('/api/metadata', (req, res) => {
    const subjects = [...new Set(database.map(item => item.subject))];
    const types = [...new Set(database.map(item => item.type))];
    const lessons = [...new Set(database.map(item => item.lesson))];
    
    res.json({ subjects, types, lessons });
});

// API: Lấy kiến thức liên quan
app.get('/api/knowledge/:id/related', (req, res) => {
    const { id } = req.params;
    const currentItem = database.find(item => item.id === id);
    
    if (!currentItem) {
        return res.status(404).json({ error: "Không tìm thấy" });
    }
    
    const relatedItems = database.filter(item => currentItem.related_ids.includes(item.id));
    res.json(relatedItems);
});

// API: Lấy chi tiết 1 item
app.get('/api/knowledge/:id', (req, res) => {
    const { id } = req.params;
    const item = database.find(item => item.id === id);
    if (!item) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(item);
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
