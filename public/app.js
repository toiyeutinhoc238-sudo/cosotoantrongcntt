document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const knowledgeGrid = document.getElementById('knowledge-grid');
    const resultsCount = document.getElementById('results-count');
    const resultsTitle = document.getElementById('results-title');
    const navSubjectList = document.getElementById('nav-subject-list');
    const navTypeList = document.getElementById('nav-type-list');
    
    // Modal Elements
    const modalOverlay = document.getElementById('detail-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubject = document.getElementById('modal-subject');
    const modalType = document.getElementById('modal-type');
    const modalLesson = document.getElementById('modal-lesson');
    const modalText = document.getElementById('modal-text');
    const modalRelatedList = document.getElementById('modal-related-list');

    // State
    let currentData = [];
    let currentFilters = { subject: '', type: '', q: '' };
    const API_URL = '/api';

    // 1. Initialize API fetch
    const initApp = async () => {
        try {
            await fetchMetadata();
            await fetchKnowledge();
        } catch (error) {
            console.error('Error init:', error);
            const isFileSystem = window.location.protocol === 'file:';
            let errorMsg = 'Lỗi kết nối Server! Vui lòng kiểm tra Node.js.';
            
            if (isFileSystem) {
                errorMsg = `
                    <div style="text-align: left; padding: 20px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid #ef4444;">
                        <h3 style="color: #ef4444; margin-top: 0;">⚠️ Không thể chạy từ File cục bộ</h3>
                        <p>Bạn đang mở file trực tiếp từ thư mục. Để ứng dụng hoạt động, bạn cần:</p>
                        <ol>
                            <li>Chạy lệnh: <code>npm start</code> trong terminal.</li>
                            <li>Truy cập địa chỉ: <a href="http://localhost:3000" style="color: #3b82f6; font-weight: bold;">http://localhost:3000</a></li>
                        </ol>
                    </div>
                `;
            }
            knowledgeGrid.innerHTML = `<div class="error-container">${errorMsg}</div>`;
        }
    };

    // 2. Fetch metadata cho Sidebar
    const fetchMetadata = async () => {
        const res = await fetch(`${API_URL}/metadata`);
        const { subjects, types } = await res.json();
        
        renderNavItems(navSubjectList, subjects, 'subject');
        renderNavItems(navTypeList, types, 'type');
    };

    const renderNavItems = (container, items, filterKey) => {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'nav-item';
            div.textContent = item;
            div.onclick = () => {
                // Xóa active cũ
                container.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                
                if (currentFilters[filterKey] === item) {
                    currentFilters[filterKey] = ''; // Bỏ chọn
                } else {
                    currentFilters[filterKey] = item; // Chọn mới
                    div.classList.add('active');
                }
                
                updateResultsTitle();
                fetchKnowledge();
            };
            container.appendChild(div);
        });
    };

    const updateResultsTitle = () => {
        let titleParts = [];
        if (currentFilters.subject) titleParts.push(currentFilters.subject);
        if (currentFilters.type) titleParts.push(currentFilters.type);
        if (currentFilters.q) titleParts.push(`"${currentFilters.q}"`);

        if (titleParts.length > 0) {
            resultsTitle.textContent = `Kết quả cho: ${titleParts.join(' - ')}`;
        } else {
            resultsTitle.textContent = 'Tất cả kiến thức';
        }
    };

    // 3. Fetch knowledge based on filters
    const fetchKnowledge = async () => {
        knowledgeGrid.innerHTML = '<div class="loading-spinner">Đang tải...</div>';
        
        const params = new URLSearchParams();
        if (currentFilters.subject) params.append('subject', currentFilters.subject);
        if (currentFilters.type) params.append('type', currentFilters.type);
        if (currentFilters.q) params.append('q', currentFilters.q);

        const res = await fetch(`${API_URL}/knowledge?${params.toString()}`);
        currentData = await res.json();
        
        resultsCount.textContent = currentData.length;
        renderCards();
    };

    // 4. Render thẻ
    const renderCards = () => {
        knowledgeGrid.innerHTML = '';
        if (currentData.length === 0) {
            knowledgeGrid.innerHTML = '<div class="loading-spinner">Không tìm thấy kết quả phù hợp.</div>';
            return;
        }

        currentData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-meta">
                    <span class="badge badge-subject">${item.subject}</span>
                    <span class="badge badge-type">${item.type}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-lesson">Bài học: ${item.lesson}</div>
                <div class="card-content-preview">${item.content}</div>
                <div class="card-footer">
                    ${item.pdf ? `<a class="badge" style="background-color: #ef4444; text-decoration: none; display: flex; align-items: center; gap: 0.25rem;" href="${item.pdf}" target="_blank" onclick="event.stopPropagation();"><i data-lucide="file-text" style="width:14px; height:14px;"></i> Xem PDF</a>` : '<span>Xem chi tiết</span>'}
                    <i data-lucide="arrow-right" style="width:16px; height:16px;"></i>
                </div>
            `;
            card.onclick = () => openModal(item);
            knowledgeGrid.appendChild(card);
        });
        
        lucide.createIcons();
        triggerMathJax();
    };

    // 5. Xử lý Modal & Chi tiết
    const openModal = async (item) => {
        modalSubject.textContent = item.subject;
        modalType.textContent = item.type;
        modalTitle.textContent = item.title;
        modalLesson.textContent = `Bài học: ${item.lesson}`;
        
        // Render content
        modalText.innerHTML = item.content.replace(/\n/g, '<br>');
        if (item.pdf) {
            modalText.innerHTML += `<div style="margin-top: 1.5rem;"><a href="${item.pdf}" target="_blank" class="badge" style="display: inline-flex; align-items: center; gap: 0.5rem; background-color: #ef4444; text-decoration: none; padding: 0.5rem 1rem;"><i data-lucide="file-down" style="width: 16px; height: 16px;"></i> Tải tài liệu bài tập (PDF)</a></div>`;
        }
        
        // Fetch related
        modalRelatedList.innerHTML = '<i>Đang tải...</i>';
        try {
            const res = await fetch(`${API_URL}/knowledge/${item.id}/related`);
            const relateds = await res.json();
            
            modalRelatedList.innerHTML = '';
            if (relateds.length === 0) {
                modalRelatedList.innerHTML = '<span>Không có</span>';
            } else {
                relateds.forEach(rel => {
                    const span = document.createElement('span');
                    span.className = 'related-item';
                    span.textContent = rel.title;
                    span.onclick = () => {
                        // Mở modal item liên quan
                        fetch(`${API_URL}/knowledge/${rel.id}`)
                            .then(r => r.json())
                            .then(data => openModal(data));
                    };
                    modalRelatedList.appendChild(span);
                });
            }
        } catch (e) {
            modalRelatedList.innerHTML = '<span>Lỗi tải liên kết</span>';
        }

        modalOverlay.classList.add('active');
        triggerMathJax(); // Re-render math inside modal
    };

    closeModalBtn.onclick = () => {
        modalOverlay.classList.remove('active');
    };

    // Đóng modal khi click ra ngoài overlay
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    };

    // 6. Xử lý Search box
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentFilters.q = e.target.value.trim();
            updateResultsTitle();
            fetchKnowledge();
        }, 400); // 400ms debounce
    });

    // 7. Dark mode Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.setAttribute('data-lucide', nextTheme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    });

    // Hàm gọi MathJax render lại công thức sau khi innerHTML
    const triggerMathJax = () => {
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise().catch(err => console.error(err));
        }
    };

    // Run
    initApp();
});
