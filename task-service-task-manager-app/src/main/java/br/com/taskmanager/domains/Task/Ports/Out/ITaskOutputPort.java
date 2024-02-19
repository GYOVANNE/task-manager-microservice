package br.com.taskmanager.domains.Task.Ports.Out;

import java.util.List;

import br.com.taskmanager.domains.Task.Entity.Task;

public interface ITaskOutputPort {
    List<Task> index();

    void create(Task request);

    Task show(Long id);

    void update(Long id, Task request);

    void delete(Long id);
}
