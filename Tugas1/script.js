document.addEventListener('DOMContentLoaded', () => {
            const taskForm = document.getElementById('task-form');
            const taskNameInput = document.getElementById('task-name');
            const taskCourseInput = document.getElementById('task-course');
            const taskDeadlineInput = document.getElementById('task-deadline');
            const taskIdInput = document.getElementById('task-id');
            const formTitle = document.getElementById('form-title');
            const cancelEditBtn = document.getElementById('cancel-edit');
            const taskListContainer = document.getElementById('task-list');
            const taskStats = document.getElementById('task-stats');
            const searchInput = document.getElementById('search-input');
            const filterStatus = document.getElementById('filter-status');

            // Variabel state untuk menyimpan semua tugas dan filter
            let tasks = [];
            let currentFilter = 'all';
            let searchTerm = ''; 
            

            // Menampilkan tugas ke UI
            const renderTasks = () => {
                taskListContainer.innerHTML = ''; // Mengkosongkan daftar sebelum render ulang

                // Melakukan filter berdasarkan status dan kata kunci pencarian
                const filteredTasks = tasks.filter(task => {
                    const matchesStatus = (currentFilter === 'all') || 
                                          (currentFilter === 'completed' && task.completed === true) ||
                                          (currentFilter === 'incomplete' && task.completed === false);
                    
                    const matchesSearch = task.name.toLowerCase().includes(searchTerm) ||
                                        task.course.toLowerCase().includes(searchTerm);

                    return matchesStatus && matchesSearch;
                });

                // Menampilkan tugas yang sudah difilter atau sebuah pesan jika tidak ada tugas yg sesuai
                if (filteredTasks.length === 0) {
                    taskListContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">Tidak ada tugas yang sesuai. Coba tambahkan tugas baru!</p>`;
                } else {
                    filteredTasks.forEach(task => {
                        const taskElement = document.createElement('div');
                        taskElement.className = `task-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-all duration-300 ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`;
                        
                        taskElement.innerHTML = `
                            <div class="flex items-center gap-4 flex-grow">
                                <input type="checkbox" data-id="${task.id}" class="task-checkbox h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${task.completed ? 'checked' : ''}>
                                <div class="${task.completed ? 'task-completed' : ''}">
                                    <p class="font-semibold text-gray-800">${task.name}</p>
                                    <p class="text-sm text-gray-500">${task.course} - <span class="font-medium text-red-600">Deadline: ${formatDate(task.deadline)}</span></p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 mt-3 sm:mt-0">
                                <button data-id="${task.id}" class="edit-btn text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>
                                </button>
                                <button data-id="${task.id}" class="delete-btn text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>
                                </button>
                            </div>
                        `;
                        taskListContainer.appendChild(taskElement);
                    });
                }
                updateStats(); // Memperbarui statistik tugas
            };

            // Menyimpan data ke localStorage
            const saveTasks = () => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            };

            // Fungsi untuk memuat data dari localStorage
            const loadTasks = () => {
                const storedTasks = localStorage.getItem('tasks');
                tasks = storedTasks ? JSON.parse(storedTasks) : [];
            };

            // Memperbarui statistik tugas
            const updateStats = () => {
                const incompleteTasks = tasks.filter(task => !task.completed).length;
                taskStats.textContent = `${incompleteTasks} tugas belum selesai`;
            };

            // Menangani submit form 
            const handleFormSubmit = (e) => {
                e.preventDefault();

                const name = taskNameInput.value.trim();
                const course = taskCourseInput.value.trim();
                const deadline = taskDeadlineInput.value;
                const id = taskIdInput.value;
                
                // Validasi form
                if (!name || !course || !deadline) {
                    showError("Semua field wajib diisi!");
                    return;
                }
                if (new Date(deadline) < new Date().setHours(0,0,0,0)) {
                    showError("Tanggal deadline tidak boleh di masa lalu.");
                    return;
                }

                // Logika tambah atau edit tugas
                if (id) { // Jika ada ID = sedang edit
                    const taskIndex = tasks.findIndex(t => t.id == id);
                    if (taskIndex > -1) {
                        tasks[taskIndex] = { ...tasks[taskIndex], name, course, deadline };
                    }
                } else { // Jika tidak ada ID = tambah baru
                    const newTask = {
                        id: Date.now(),
                        name,
                        course,
                        deadline,
                        completed: false
                    };
                    tasks.push(newTask);
                }
                
                saveTasks();
                renderTasks();
                resetForm();
            };

            // Menangani klik pada daftar tugas
            const handleTaskListClick = (e) => {
                const target = e.target.closest('button, input[type="checkbox"]');
                if (!target) return;

                const id = target.dataset.id;
                if (target.classList.contains('delete-btn')) {
                    deleteTask(id);
                } else if (target.classList.contains('edit-btn')) {
                    populateFormForEdit(id);
                } else if (target.classList.contains('task-checkbox')) {
                    toggleTaskCompletion(id);
                }
            };
    

            const deleteTask = (id) => {
                tasks = tasks.filter(task => task.id != id);
                saveTasks();
                renderTasks();
            };

            const toggleTaskCompletion = (id) => {
                const task = tasks.find(task => task.id == id);
                if (task) {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks();
                }
            };

            const populateFormForEdit = (id) => {
                const task = tasks.find(task => task.id == id);
                if (task) {
                    taskIdInput.value = task.id;
                    taskNameInput.value = task.name;
                    taskCourseInput.value = task.course;
                    taskDeadlineInput.value = task.deadline;
                    formTitle.textContent = "Edit Tugas";
                    cancelEditBtn.classList.remove('hidden');
                    taskNameInput.focus();
                }
            };

            const resetForm = () => {
                taskForm.reset();
                taskIdInput.value = '';
                formTitle.textContent = "Tambah Tugas Baru";
                cancelEditBtn.classList.add('hidden');
            };
            
            const formatDate = (dateString) => {
                 const options = { year: 'numeric', month: 'long', day: 'numeric' };
                 return new Date(dateString).toLocaleDateString('id-ID', options);
            };

            const showError = (message) => {
                errorMessage.textContent = message;
                errorModal.classList.remove('hidden');
            };

    
            taskForm.addEventListener('submit', handleFormSubmit);
            taskListContainer.addEventListener('click', handleTaskListClick);
            cancelEditBtn.addEventListener('click', resetForm);
            
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value.toLowerCase();
                renderTasks();
            });

            filterStatus.addEventListener('change', (e) => {
                currentFilter = e.target.value;
                renderTasks();
            });

        
            loadTasks();
            renderTasks();
        });