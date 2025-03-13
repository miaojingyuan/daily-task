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
                modal.style.display = 'block';
            }
        });
    });
    
    // 关闭弹窗按钮点击事件
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.task-completion-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 点击模态框背景关闭弹窗
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.closest('.task-completion-modal');
            if (modal) {
                modal.style.display = 'none';
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