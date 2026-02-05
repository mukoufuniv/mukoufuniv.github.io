// projectsカードの開閉機能
document.addEventListener('DOMContentLoaded', () => {
    // JS有効時のみ折りたたみを有効にするためのフラグ
    document.documentElement.classList.add('js');

    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        // 詳細ブロックが無いカードはスキップ
        const details = card.querySelector('.project-details');
        if (!details) {
            return;
        }

        // ARIA制御に使うIDを用意
        const hint = card.querySelector('.details-hint');
        const detailsId = details.id || `project-details-${index + 1}`;

        // キーボード操作できるようボタン化
        details.id = detailsId;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-controls', detailsId);
        card.setAttribute('aria-expanded', 'false');

        // 開閉状態の反映（クラス・ARIA・ヒント文）
        const setState = (isOpen) => {
            card.classList.toggle('is-open', isOpen);
            card.setAttribute('aria-expanded', String(isOpen));
            details.setAttribute('aria-hidden', String(!isOpen));
            if (hint) {
                hint.textContent = isOpen ? 'クリックで閉じる' : 'クリックで詳細を見る';
            }
        };

        // 現在の状態を反転
        const toggle = () => {
            setState(!card.classList.contains('is-open'));
        };

        // カードクリックで開閉（リンクやボタン、メディア操作は除外）
        card.addEventListener('click', (event) => {
            if (event.target.closest('a, button, video, img')) {
                return;
            }
            toggle();
        });

        // Enter/Spaceで開閉（リンクやボタン、メディア操作は除外）
        card.addEventListener('keydown', (event) => {
            if (event.target.closest('a, button, video, img')) {
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });

        // 初期状態は閉じる
        setState(false);
    });

    // 動画・画像タブで表示中のメディアを切り替える
    const mediaBlocks = document.querySelectorAll('.project-media');
    mediaBlocks.forEach((media) => {
        const video = media.querySelector('video');
        const videoTabs = media.querySelectorAll('.video-tab');
        if (video && videoTabs.length > 0) {
            const source = video.querySelector('source');

            const setActiveTab = (activeTab) => {
                videoTabs.forEach((tab) => {
                    const isActive = tab === activeTab;
                    tab.classList.toggle('is-active', isActive);
                    tab.setAttribute('aria-pressed', String(isActive));
                });
            };

            const setVideoSrc = (src) => {
                if (!src) {
                    return;
                }
                if (source) {
                    if (source.getAttribute('src') === src) {
                        return;
                    }
                    source.setAttribute('src', src);
                    video.load();
                    return;
                }
                if (video.getAttribute('src') === src) {
                    return;
                }
                video.setAttribute('src', src);
                video.load();
            };

            videoTabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    const src = tab.getAttribute('data-video-src');
                    setActiveTab(tab);
                    setVideoSrc(src);
                });
            });

            const initialTab = media.querySelector('.video-tab.is-active') || videoTabs[0];
            if (initialTab) {
                setActiveTab(initialTab);
                setVideoSrc(initialTab.getAttribute('data-video-src'));
            }
        }

        const image = media.querySelector('img');
        const imageTabs = media.querySelectorAll('.image-tab');
        if (image && imageTabs.length > 0) {
            const caption = media.querySelector('.media-caption');

            const setActiveTab = (activeTab) => {
                imageTabs.forEach((tab) => {
                    const isActive = tab === activeTab;
                    tab.classList.toggle('is-active', isActive);
                    tab.setAttribute('aria-pressed', String(isActive));
                });
            };

            const setImage = (src, alt, captionText) => {
                if (src && image.getAttribute('src') !== src) {
                    image.setAttribute('src', src);
                }
                if (alt) {
                    image.setAttribute('alt', alt);
                }
                if (caption && captionText) {
                    caption.textContent = captionText;
                }
            };

            imageTabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    const src = tab.getAttribute('data-image-src');
                    const alt = tab.getAttribute('data-image-alt');
                    const captionText = tab.getAttribute('data-image-caption');
                    setActiveTab(tab);
                    setImage(src, alt, captionText);
                });
            });

            const initialTab = media.querySelector('.image-tab.is-active') || imageTabs[0];
            if (initialTab) {
                setActiveTab(initialTab);
                setImage(
                    initialTab.getAttribute('data-image-src'),
                    initialTab.getAttribute('data-image-alt'),
                    initialTab.getAttribute('data-image-caption')
                );
            }
        }
    });
});
