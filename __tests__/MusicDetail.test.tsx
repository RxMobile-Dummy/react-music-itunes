import React from 'react';
import Music from '../src/screens/Music';
import renderer from 'react-test-renderer';

jest.useFakeTimers()

it("album name and release date", () => {
    const mockAlbumTodoItemFn = jest.fn();
    const mockReleaseTodoItemFn = jest.fn();
    const { getByText } = renderer.create(
        <Music
            todo={{ todoText: 0 || 1 }}
            editTodoItem={mockAlbumTodoItemFn}
            deleteTodoItem={mockReleaseTodoItemFn}
        />
    );
    fireEvent.press(getByText("Album Name"));
    fireEvent.press(getByText("Release Date"));

    expect(mockAlbumTodoItemFn).toBeCalledWith({
        1: { todoText: 0 },
    });

    expect(mockReleaseTodoItemFn).toBeCalledWith({
        1: { todoText: 1 },
    });
});