// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 底部导航栏切换效果
    setupTabBarInteraction();
    
    // 添加页面切换的淡入淡出动画
    setupPageTransitions();
    
    // 设置推荐页交互
    setupRecommendPageInteractions();
    
    // 设置广场页交互
    setupSquarePageInteractions();
    
    // 添加触摸反馈效果
    addTouchFeedback();
    
    // 发现Tab交互功能
    setupDiscoverTabInteractions();
    
    // 设置我的页面交互
    setupProfilePageInteractions();

    // 任务标题字数统计
    const titleInput = document.querySelector('.title-input');
    const charCount = document.querySelector('.char-count');
    
    if (titleInput && charCount) {
        titleInput.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length}/20`;
            
            // 当接近字数限制时改变颜色提示
            if (length >= 20) {
                charCount.style.color = '#FF3B30';
            } else if (length >= 15) {
                charCount.style.color = '#FF9500';
            } else {
                charCount.style.color = 'var(--text-tertiary)';
            }
        });
    }
});

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElements = document.querySelectorAll('.status-bar-time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    timeElements.forEach(el => {
        el.textContent = formattedTime;
    });
}

// 设置底部导航栏交互
function setupTabBarInteraction() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有激活状态
            tabItems.forEach(t => t.classList.remove('active'));
            
            // 添加当前点击项的激活状态
            this.classList.add('active');
            
            // 这里可以添加页面切换逻辑
            // 在完整实现中会根据点击的标签切换显示不同的内容
        });
    });
}

// 设置页面切换动画
function setupPageTransitions() {
    // 在完整实现中，这里会添加页面切换的淡入淡出效果
    // 目前只是一个占位函数，后续会实现实际功能
}

// 设置推荐页交互
function setupRecommendPageInteractions() {
    // 完成任务按钮点击事件
    const completeButtons = document.querySelectorAll('.complete-button');
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.device-frame').querySelector('.task-completion-modal');
            if (modal) {
                // 确保弹窗在设备框架内显示
                modal.style.display = 'block';
                
                // 使用requestAnimationFrame确保DOM更新后再添加active类
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                    
                    // 重置之前可能设置的样式
                    const modalContainer = modal.querySelector('.modal-container');
                    modalContainer.style.height = '';
                    modalContainer.style.overflowY = 'auto';
                    
                    // 检查弹窗是否超出设备框架
                    const deviceFrame = this.closest('.device-frame');
                    const deviceHeight = deviceFrame.offsetHeight;
                    
                    // 计算可用高度 - 考虑设备总高度
                    const availableHeight = deviceHeight * 0.95; // 使用设备高度的95%
                    
                    // 设置最大高度
                    modalContainer.style.maxHeight = availableHeight + 'px';
                    
                    // 确保弹窗内容可见
                    setTimeout(() => {
                        // 检查内容是否完全可见
                        const modalContent = modalContainer.querySelector('.modal-content');
                        if (modalContent && modalContainer.scrollHeight > modalContainer.clientHeight) {
                            // 如果内容需要滚动，确保弹窗足够高
                            modalContainer.scrollTop = 0; // 滚动到顶部
                        }
                    }, 100);
                });
            }
        });
    });
    
    // 关闭弹窗按钮点击事件
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.task-completion-modal');
            if (modal) {
                modal.classList.remove('active');
                // 等待过渡动画完成后再隐藏元素
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // 点击模态框背景关闭弹窗
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.closest('.task-completion-modal');
            if (modal) {
                modal.classList.remove('active');
                // 等待过渡动画完成后再隐藏元素
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // 刷新按钮点击事件
    const refreshButtons = document.querySelectorAll('.refresh-button');
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countElement = this.querySelector('.refresh-count');
            if (countElement) {
                let count = parseInt(countElement.textContent);
                if (count > 0) {
                    count--;
                    countElement.textContent = count;
                    
                    // 模拟任务刷新效果
                    const taskCard = this.closest('.task-card');
                    if (taskCard) {
                        taskCard.classList.add('refreshing');
                        
                        // 随机更换任务内容
                        const tasks = [
                            {
                                title: '拍摄一张花朵照片',
                                description: '在你的周围寻找一朵美丽的花，拍下它的照片。可以是野花、家养花卉或者公园里的花朵。尝试捕捉它最美的一面。',
                                difficulty: 2,
                                time: '10分钟'
                            },
                            {
                                title: '记录一段有趣的对话',
                                description: '今天与朋友、家人或陌生人的对话中，记录下一段有趣或有启发性的对话。思考这段对话给你带来了什么感受或启示。',
                                difficulty: 1,
                                time: '15分钟'
                            },
                            {
                                title: '尝试一种新的食物',
                                description: '今天尝试一种你从未吃过的食物或饮料。可以是不同文化的美食，或者是你一直想尝试但没有机会的东西。',
                                difficulty: 2,
                                time: '30分钟'
                            },
                            {
                                title: '进行5分钟冥想',
                                description: '找一个安静的地方，花5分钟时间进行简单的冥想。专注于你的呼吸，让思绪平静下来。记录下冥想前后的感受变化。',
                                difficulty: 1,
                                time: '5分钟'
                            }
                        ];
                        
                        // 随机选择一个不同的任务
                        let currentTitle = taskCard.querySelector('.task-title').textContent;
                        let newTask;
                        do {
                            newTask = tasks[Math.floor(Math.random() * tasks.length)];
                        } while (newTask.title === currentTitle);
                        
                        // 更新任务内容
                        setTimeout(() => {
                            taskCard.querySelector('.task-title').textContent = newTask.title;
                            taskCard.querySelector('.task-description').textContent = newTask.description;
                            
                            // 更新难度点
                            const difficultyDots = taskCard.querySelectorAll('.difficulty-dot');
                            difficultyDots.forEach((dot, index) => {
                                if (index < newTask.difficulty) {
                                    dot.classList.add('active');
                                } else {
                                    dot.classList.remove('active');
                                }
                            });
                            
                            // 更新难度文本
                            const difficultyLabel = taskCard.querySelector('.difficulty-label');
                            if (difficultyLabel) {
                                difficultyLabel.textContent = newTask.difficulty === 1 ? '简单' : 
                                                             newTask.difficulty === 2 ? '中等难度' : '困难';
                            }
                            
                            // 更新预计用时
                            const timeElement = taskCard.querySelector('.task-time');
                            if (timeElement) {
                                timeElement.textContent = `预计用时: ${newTask.time}`;
                            }
                            
                            taskCard.classList.remove('refreshing');
                        }, 500);
                    }
                    
                    // 如果刷新次数用完，禁用按钮
                    if (count === 0) {
                        this.classList.add('disabled');
                        this.disabled = true;
                    }
                }
            }
        });
    });
    
    // 图片上传单元格点击事件
    const uploadCells = document.querySelectorAll('.image-upload-cell');
    uploadCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // 模拟图片上传
            if (!this.classList.contains('has-image')) {
                // 创建一个模拟的文件输入框
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                
                // 添加到DOM并触发点击
                document.body.appendChild(fileInput);
                fileInput.click();
                
                // 监听文件选择事件
                fileInput.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            // 创建图片预览
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'cover';
                            
                            // 清空单元格内容并添加图片
                            cell.innerHTML = '';
                            cell.appendChild(img);
                            cell.classList.add('has-image');
                            
                            // 添加删除按钮
                            const deleteBtn = document.createElement('button');
                            deleteBtn.className = 'delete-image-btn';
                            deleteBtn.innerHTML = '<i class="sf-symbol">xmark.circle.fill</i>';
                            cell.appendChild(deleteBtn);
                            
                            // 删除按钮点击事件
                            deleteBtn.addEventListener('click', function(e) {
                                e.stopPropagation();
                                cell.innerHTML = '<div class="upload-placeholder"><i class="sf-symbol">plus</i></div>';
                                cell.classList.remove('has-image');
                            });
                        };
                        
                        reader.readAsDataURL(this.files[0]);
                    }
                    
                    // 移除临时输入框
                    document.body.removeChild(fileInput);
                });
            }
        });
    });
}

// 设置广场页交互
function setupSquarePageInteractions() {
    // 顶部Tab切换
    const tabButtons = document.querySelectorAll('.page-tabs .tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有激活状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前点击项的激活状态
            this.classList.add('active');
            
            // 这里可以添加Tab内容切换逻辑
            // 在完整实现中会根据点击的Tab切换显示不同的内容
        });
    });
    
    // 时间周期切换
    const filterOptions = document.querySelectorAll('.time-filter .filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有激活状态
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // 添加当前点击项的激活状态
            this.classList.add('active');
            
            // 这里可以添加时间周期切换逻辑
            // 在完整实现中会根据点击的选项切换显示不同的排行榜数据
        });
    });
    
    // 投票按钮点击事件
    const voteButtons = document.querySelectorAll('.vote-button');
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 切换投票状态
            this.classList.toggle('voted');
            
            // 更新图标
            const icon = this.querySelector('.sf-symbol');
            if (this.classList.contains('voted')) {
                icon.textContent = 'hand.thumbsup.fill';
                
                // 更新投票数量
                const rankingCard = this.closest('.ranking-card');
                if (rankingCard) {
                    const voteCountElement = rankingCard.querySelector('.vote-count span');
                    if (voteCountElement) {
                        let count = parseInt(voteCountElement.textContent.replace(',', ''));
                        count++;
                        voteCountElement.textContent = count.toLocaleString();
                    }
                }
            } else {
                icon.textContent = 'hand.thumbsup';
                
                // 更新投票数量
                const rankingCard = this.closest('.ranking-card');
                if (rankingCard) {
                    const voteCountElement = rankingCard.querySelector('.vote-count span');
                    if (voteCountElement) {
                        let count = parseInt(voteCountElement.textContent.replace(',', ''));
                        count--;
                        voteCountElement.textContent = count.toLocaleString();
                    }
                }
            }
        });
    });
    
    // 添加到备选库按钮点击事件
    const addToLibraryButton = document.querySelector('.add-to-library-button');
    if (addToLibraryButton) {
        addToLibraryButton.addEventListener('click', function() {
            // 模拟添加到备选库的效果
            this.innerHTML = '<i class="sf-symbol">checkmark.circle.fill</i><span>已添加到备选库</span>';
            this.style.color = '#34C759'; // 成功绿色
            this.disabled = true;
            
            // 2秒后恢复原样
            setTimeout(() => {
                this.innerHTML = '<i class="sf-symbol">plus.circle.fill</i><span>添加到我的备选库</span>';
                this.style.color = '';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // 推荐事项提交表单
    const suggestionForm = document.querySelector('.suggestion-form');
    if (suggestionForm) {
        const submitButton = suggestionForm.querySelector('.submit-suggestion');
        const inputField = suggestionForm.querySelector('.form-input');
        
        submitButton.addEventListener('click', function() {
            if (inputField.value.trim() !== '') {
                // 模拟提交成功效果
                const originalContent = this.innerHTML;
                this.innerHTML = '<i class="sf-symbol">checkmark</i>';
                
                // 清空输入框
                inputField.value = '';
                
                // 显示成功提示
                showIOSAlert('提交成功', '感谢您的推荐，我们会尽快审核。');
                
                // 恢复按钮原样
                setTimeout(() => {
                    this.innerHTML = originalContent;
                }, 1000);
            } else {
                // 输入为空时显示提示
                inputField.classList.add('error');
                inputField.placeholder = '请输入任务标题';
                
                // 移除错误状态
                setTimeout(() => {
                    inputField.classList.remove('error');
                    inputField.placeholder = '输入任务标题...';
                }, 1500);
            }
        });
        
        // 输入框回车提交
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                submitButton.click();
            }
        });
    }
}

// 模拟iOS风格的弹窗效果
function showIOSAlert(title, message, buttonText = '确定', callback = null) {
    // 创建弹窗容器
    const alertContainer = document.createElement('div');
    alertContainer.className = 'ios-alert-container';
    
    // 创建弹窗内容
    const alertBox = document.createElement('div');
    alertBox.className = 'ios-alert-box';
    
    // 添加标题
    const titleElement = document.createElement('h3');
    titleElement.className = 'ios-alert-title';
    titleElement.textContent = title;
    
    // 添加消息
    const messageElement = document.createElement('p');
    messageElement.className = 'ios-alert-message';
    messageElement.textContent = message;
    
    // 添加按钮
    const buttonElement = document.createElement('button');
    buttonElement.className = 'ios-alert-button';
    buttonElement.textContent = buttonText;
    
    // 组装弹窗
    alertBox.appendChild(titleElement);
    alertBox.appendChild(messageElement);
    alertBox.appendChild(buttonElement);
    alertContainer.appendChild(alertBox);
    
    // 添加到页面
    document.body.appendChild(alertContainer);
    
    // 添加弹窗动画
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 10);
    
    // 点击按钮关闭弹窗
    buttonElement.addEventListener('click', () => {
        alertContainer.classList.remove('show');
        
        // 延迟移除DOM元素
        setTimeout(() => {
            document.body.removeChild(alertContainer);
            if (callback) callback();
        }, 300);
    });
}

// 添加触摸反馈效果
function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll('button, .tab-item, .card, .interactive, .history-hint, .tab-button, .filter-option, .ranking-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
        
        // 为鼠标事件也添加类似效果
        element.addEventListener('mousedown', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('mouseup', function() {
            this.classList.remove('touch-active');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('touch-active');
        });
    });
}

// 发现Tab交互功能
function setupDiscoverTabInteractions() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const feedCards = document.querySelectorAll('.feed-card');
    const likeButtons = document.querySelectorAll('.action-button[data-action="like"]');
    const commentButtons = document.querySelectorAll('.action-button[data-action="comment"]');
    const shareButtons = document.querySelectorAll('.action-button[data-action="share"]');
    const commentInputs = document.querySelectorAll('.comment-textbox');

    // 过滤选项切换
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            filterOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // 模拟内容过滤
            simulateContentFilter(option.dataset.filter);
        });
    });

    // 点赞功能
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('liked');
            const likeCount = button.querySelector('.count');
            const currentCount = parseInt(likeCount.textContent);
            likeCount.textContent = button.classList.contains('liked') ? 
                currentCount + 1 : currentCount - 1;
            
            // 添加触感反馈
            if (window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        });
    });

    // 评论功能
    commentButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const commentInput = commentInputs[index];
            commentInput.focus();
        });
    });

    // 评论输入处理
    commentInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const comment = input.value.trim();
                if (comment) {
                    addNewComment(input.closest('.feed-card'), comment);
                    input.value = '';
                }
            }
        });
    });

    // 分享功能
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            showShareSheet();
        });
    });
}

// 模拟内容过滤
function simulateContentFilter(filter) {
    const waterfall = document.querySelector('.waterfall-container');
    
    // 添加加载动画
    waterfall.style.opacity = '0.6';
    
    setTimeout(() => {
        // 模拟数据加载完成
        waterfall.style.opacity = '1';
        
        // 这里可以根据filter类型来排序或筛选内容
        console.log(`Content filtered by: ${filter}`);
    }, 500);
}

// 添加新评论
function addNewComment(feedCard, commentText) {
    const commentsSection = feedCard.querySelector('.comments-section');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-content">
            <span class="comment-user">我</span>
            <span class="comment-text">${commentText}</span>
        </div>
    `;
    commentsSection.appendChild(newComment);
}

// 显示分享面板
function showShareSheet() {
    const shareSheet = document.createElement('div');
    shareSheet.className = 'share-sheet';
    shareSheet.innerHTML = `
        <div class="share-options">
            <button class="share-option">
                <i class="icon-wechat"></i>
                <span>微信</span>
            </button>
            <button class="share-option">
                <i class="icon-moments"></i>
                <span>朋友圈</span>
            </button>
            <button class="share-option">
                <i class="icon-copy"></i>
                <span>复制链接</span>
            </button>
        </div>
        <button class="cancel-share">取消</button>
    `;
    
    document.body.appendChild(shareSheet);
    
    // 添加动画效果
    requestAnimationFrame(() => {
        shareSheet.classList.add('active');
    });
    
    // 点击取消按钮关闭分享面板
    shareSheet.querySelector('.cancel-share').addEventListener('click', () => {
        shareSheet.classList.remove('active');
        setTimeout(() => {
            shareSheet.remove();
        }, 300);
    });
}

// 设置我的页面交互
function setupProfilePageInteractions() {
    // 头像编辑按钮点击事件
    const editAvatarButton = document.querySelector('.edit-avatar-button');
    if (editAvatarButton) {
        editAvatarButton.addEventListener('click', () => {
            showImagePickerSheet();
        });
    }

    // 查看全部按钮点击事件
    const viewAllButton = document.querySelector('.view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', () => {
            showTaskHistoryModal();
        });
    }

    // 任务历史项点击事件
    const taskHistoryItems = document.querySelectorAll('.task-history-item');
    taskHistoryItems.forEach(item => {
        item.addEventListener('click', () => {
            showTaskDetailModal(item.querySelector('.task-info h4').textContent);
        });
    });

    // 设置项点击事件
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
        item.addEventListener('click', () => {
            handleSettingsItemClick(item);
        });
    });
}

// 显示图片选择面板
function showImagePickerSheet() {
    const actionSheet = document.createElement('div');
    actionSheet.className = 'action-sheet';
    actionSheet.innerHTML = `
        <div class="action-sheet-content">
            <div class="action-sheet-header">
                <h3>更换头像</h3>
            </div>
            <div class="action-sheet-options">
                <button class="action-sheet-option">
                    <i class="sf-symbol">camera.fill</i>
                    <span>拍摄照片</span>
                </button>
                <button class="action-sheet-option">
                    <i class="sf-symbol">photo.fill</i>
                    <span>从相册选择</span>
                </button>
            </div>
            <button class="action-sheet-cancel">取消</button>
        </div>
    `;

    document.body.appendChild(actionSheet);

    // 添加动画效果
    requestAnimationFrame(() => {
        actionSheet.classList.add('active');
    });

    // 选项点击事件
    const options = actionSheet.querySelectorAll('.action-sheet-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // 模拟图片选择
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.click();

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const userAvatar = document.querySelector('.user-avatar-large img');
                        if (userAvatar) {
                            userAvatar.src = event.target.result;
                        }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });

            closeActionSheet(actionSheet);
        });
    });

    // 取消按钮点击事件
    const cancelButton = actionSheet.querySelector('.action-sheet-cancel');
    cancelButton.addEventListener('click', () => {
        closeActionSheet(actionSheet);
    });
}

// 关闭操作面板
function closeActionSheet(sheet) {
    sheet.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(sheet);
    }, 300);
}

// 显示任务历史详情
function showTaskHistoryModal() {
    const modal = document.createElement('div');
    modal.className = 'ios-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-button">
                    <i class="sf-symbol">xmark</i>
                </button>
                <h3>任务历史</h3>
                <div class="placeholder-button"></div>
            </div>
            <div class="modal-body">
                <div class="task-timeline">
                    <!-- 复制现有的时间线结构 -->
                    <div class="timeline-group">
                        <div class="timeline-date">今天</div>
                        <div class="timeline-items">
                            <div class="task-history-item" data-task-id="1">
                                <div class="task-icon completed">
                                    <i class="sf-symbol">checkmark.circle.fill</i>
                                </div>
                                <div class="task-info">
                                    <h4>拍摄一张花朵照片</h4>
                                    <p>完成于 14:30</p>
                                </div>
                                <i class="sf-symbol chevron">chevron.right</i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="timeline-group">
                        <div class="timeline-date">本周</div>
                        <div class="timeline-items">
                            <div class="task-history-item" data-task-id="2">
                                <div class="task-icon completed">
                                    <i class="sf-symbol">checkmark.circle.fill</i>
                                </div>
                                <div class="task-info">
                                    <h4>尝试一种新的食物</h4>
                                    <p>完成于 昨天 19:45</p>
                                </div>
                                <i class="sf-symbol chevron">chevron.right</i>
                            </div>
                            <div class="task-history-item" data-task-id="3">
                                <div class="task-icon completed">
                                    <i class="sf-symbol">checkmark.circle.fill</i>
                                </div>
                                <div class="task-info">
                                    <h4>进行5分钟冥想</h4>
                                    <p>完成于 昨天 09:15</p>
                                </div>
                                <i class="sf-symbol chevron">chevron.right</i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="timeline-group">
                        <div class="timeline-date">更早</div>
                        <div class="timeline-items">
                            <div class="task-history-item" data-task-id="4">
                                <div class="task-icon completed">
                                    <i class="sf-symbol">checkmark.circle.fill</i>
                                </div>
                                <div class="task-info">
                                    <h4>记录一段有趣的对话</h4>
                                    <p>完成于 3月15日</p>
                                </div>
                                <i class="sf-symbol chevron">chevron.right</i>
                            </div>
                            <div class="task-history-item" data-task-id="5">
                                <div class="task-icon completed">
                                    <i class="sf-symbol">checkmark.circle.fill</i>
                                </div>
                                <div class="task-info">
                                    <h4>晨跑30分钟</h4>
                                    <p>完成于 3月14日</p>
                                </div>
                                <i class="sf-symbol chevron">chevron.right</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 添加动画效果
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 为每个任务项添加点击事件
    const taskItems = modal.querySelectorAll('.task-history-item');
    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const taskId = item.dataset.taskId;
            const taskTitle = item.querySelector('.task-info h4').textContent;
            showTaskDetailModal(taskTitle, taskId);
        });
    });

    // 关闭按钮点击事件
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
}

// 显示任务详情
function showTaskDetailModal(taskTitle, taskId) {
    // 模拟获取任务详情数据
    const taskDetails = getTaskDetails(taskId);
    
    const modal = document.createElement('div');
    modal.className = 'ios-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-button">
                    <i class="sf-symbol">xmark</i>
                </button>
                <h3>任务详情</h3>
                <div class="placeholder-button"></div>
            </div>
            <div class="modal-body">
                <div class="task-detail">
                    <h4>${taskTitle}</h4>
                    <div class="task-meta">
                        <span class="completion-time">${taskDetails.completionTime}</span>
                        <span class="task-duration">${taskDetails.duration}</span>
                    </div>
                    ${taskDetails.images ? `
                        <div class="task-images">
                            ${taskDetails.images.map(img => `
                                <div class="gallery-image">
                                    <img src="${img}" alt="任务完成照片">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div class="task-thoughts">
                        <p>${taskDetails.thoughts}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 添加动画效果
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 关闭按钮点击事件
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
}

// 模拟获取任务详情数据
function getTaskDetails(taskId) {
    // 模拟的任务详情数据
    const taskDetailsMap = {
        '1': {
            completionTime: '今天 14:30',
            duration: '用时15分钟',
            images: [
                'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            ],
            thoughts: '今天在公园散步时拍摄了这些花朵，阳光透过花瓣的感觉真的很治愈。这个任务让我更加留意身边的美好事物。'
        },
        '2': {
            completionTime: '昨天 19:45',
            duration: '用时45分钟',
            images: [
                'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            ],
            thoughts: '第一次尝试泰国菜，Tom Yum汤的味道很特别，酸辣可口。这次体验让我对泰国美食产生了浓厚的兴趣。'
        },
        // 可以继续添加其他任务的详情数据
    };
    
    return taskDetailsMap[taskId] || {
        completionTime: '未知时间',
        duration: '时长未记录',
        thoughts: '暂无记录'
    };
}

// 处理设置项点击
function handleSettingsItemClick(item) {
    const settingType = item.querySelector('span').textContent;
    
    switch (settingType) {
        case '提醒设置':
            showReminderSettings();
            break;
        case '我的收藏':
            showFavorites();
            break;
        case '邀请好友':
            showShareSheet();
            break;
        case '通用设置':
            showGeneralSettings();
            break;
    }
}

// 显示提醒设置
function showReminderSettings() {
    const modal = document.createElement('div');
    modal.className = 'ios-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-button">
                    <i class="sf-symbol">xmark</i>
                </button>
                <h3>提醒设置</h3>
                <div class="placeholder-button"></div>
            </div>
            <div class="modal-body">
                <div class="settings-group">
                    <div class="settings-row">
                        <span>每日提醒</span>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="settings-row">
                        <span>提醒时间</span>
                        <input type="time" value="09:00">
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 添加动画效果
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 关闭按钮点击事件
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
} 