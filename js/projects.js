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

        // カードクリックで開閉（リンククリックは除外）
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }
            toggle();
        });

        // Enter/Spaceで開閉（リンク操作は除外）
        card.addEventListener('keydown', (event) => {
            if (event.target.closest('a')) {
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
});
