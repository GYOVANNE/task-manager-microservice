package br.com.taskmanager.Util;

public enum StatusType {
    CREATED(1),
    UPDATED(2),
    DELETED(3),
    INACTIVATED(4),
    SAVED(5),
    ;

    private final int value;

    StatusType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
