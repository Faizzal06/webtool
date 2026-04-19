// QR Code Generator - Main Script

let qrcodeObj = null;

document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const clearBtn = document.getElementById('clear-btn');
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bg-color');
    const qrcodeContainer = document.getElementById('qrcode-container');

    // Generate QR Code
    generateBtn.addEventListener('click', function() {
        const text = qrText.value.trim();
        
        if (!text) {
            alert('⚠️ Mohon masukkan teks atau URL terlebih dahulu!');
            qrText.focus();
            return;
        }

        // Clear previous QR code
        qrcodeContainer.innerHTML = '';

        // Get settings
        const size = parseInt(qrSize.value) || 256;
        const color = qrColor.value || '#000000';
        const bgColor = qrBgColor.value || '#ffffff';

        // Generate new QR code
        try {
            qrcodeObj = new QRCode(qrcodeContainer, {
                text: text,
                width: size,
                height: size,
                colorDark: color,
                colorLight: bgColor,
                correctLevel: QRCode.CorrectLevel.H
            });

            // Enable download button
            downloadBtn.disabled = false;
            
            // Show success message
            showNotification('✅ QR Code berhasil dibuat!');
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('❌ Terjadi kesalahan saat membuat QR Code. Silakan coba lagi.');
        }
    });

    // Download QR Code as PNG
    downloadBtn.addEventListener('click', function() {
        const canvas = qrcodeContainer.querySelector('canvas');
        const img = qrcodeContainer.querySelector('img');
        
        if (!canvas && !img) {
            alert('⚠️ Tidak ada QR Code untuk didownload!');
            return;
        }

        // Get the image source (either from canvas or img)
        let dataURL;
        if (canvas) {
            dataURL = canvas.toDataURL('image/png');
        } else if (img) {
            dataURL = img.src;
        }

        // Create download link
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = dataURL;
        link.click();

        showNotification('📥 QR Code sedang didownload!');
    });

    // Clear everything
    clearBtn.addEventListener('click', function() {
        qrText.value = '';
        qrcodeContainer.innerHTML = '<div class="placeholder"><p>QR Code akan muncul di sini</p></div>';
        downloadBtn.disabled = true;
        qrText.focus();
        showNotification('🗑️ Form telah dibersihkan');
    });

    // Generate on Enter key (Ctrl+Enter for textarea)
    qrText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateBtn.click();
        }
    });

    // Auto-enable download if QR code exists
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                const canvas = qrcodeContainer.querySelector('canvas');
                const img = qrcodeContainer.querySelector('img');
                if (canvas || img) {
                    downloadBtn.disabled = false;
                }
            }
        });
    });

    observer.observe(qrcodeContainer, { childList: true });

    // Show notification helper
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-size: 1rem;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
