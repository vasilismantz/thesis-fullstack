const $ = window.$;

export function loadTree() {
    const trees = $('[data-widget="treeview"]');
    trees.Treeview('init');
}