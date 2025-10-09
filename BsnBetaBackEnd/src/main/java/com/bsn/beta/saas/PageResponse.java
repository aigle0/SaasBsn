package com.bsn.beta.saas;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int number;
    private int size;
    private Long totalElements;
    private int totalPages;
    private boolean last;
    private boolean first;
}
