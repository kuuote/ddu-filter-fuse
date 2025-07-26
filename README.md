# ddu-filter-fuse

[![license:MIT](https://img.shields.io/github/license/Milly/ddu-filter-fuse?style=flat-square)](./LICENSE)
[![Vim doc](https://img.shields.io/badge/doc-%3Ah%20ddu--filter--fuse-orange?style=flat-square&logo=vim)][doc]

[ddu.vim] matcher, sorter, and converter that uses [Fuse.js] for fuzzy
searching.

[ddu.vim]: https://github.com/Shougo/ddu.vim
[Fuse.js]: https://fusejs.io

## Features

- **matcher_fuse**: Fuzzy matching filter using Fuse.js
- **sorter_fuse**: Sort items based on Fuse.js score
- **converter_fuse_highlight**: Highlight matched text in results

## Requirements

- [ddu.vim](https://github.com/Shougo/ddu.vim)
- [denops.vim](https://github.com/vim-denops/denops.vim)

## Installation

> [!IMPORTANT]
> This repository has been transferred from the original author. While GitHub
> automatically redirects from the old URL, it is recommended to update your
> clone origin, or plugin manager configuration to the new URL.

Using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'Shougo/ddu.vim'
Plug 'vim-denops/denops.vim'
Plug 'Milly/ddu-filter-fuse'
```

Using [dein.vim](https://github.com/Shougo/dein.vim):

```vim
call dein#add('Shougo/ddu.vim')
call dein#add('vim-denops/denops.vim')
call dein#add('Milly/ddu-filter-fuse')
```

## Configuration

See [`:help ddu-filter-fuse`][doc] for detailed documentation.

[doc]: ./doc/ddu-filter-fuse.txt

### Example configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_fuse'],
    \       sorters: ['sorter_fuse'],
    \       converters: ['converter_fuse_highlight'],
    \     },
    \   },
    \   filterParams: #{
    \     matcher_fuse: #{
    \       threshold: 0.6,
    \     },
    \     converter_fuse_highlight: #{
    \       highlightMatched: 'Search',
    \     },
    \   }
    \ })
```
