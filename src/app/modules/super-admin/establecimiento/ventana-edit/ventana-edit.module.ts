import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentanaEditRoutingModule } from './ventana-edit-routing.module';
import { EditVentanaComponent } from './pages/edit-ventana/edit-ventana.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';

import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { SpeedDialModule } from 'primeng/speeddial';
import { PickListModule } from 'primeng/picklist'; // opc
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { CaptchaModule } from 'primeng/captcha';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { FocusTrapModule } from 'primeng/focustrap';
import { StyleClassModule } from 'primeng/styleclass';
import { AutoFocusModule } from 'primeng/autofocus';

import { InplaceModule } from 'primeng/inplace';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    EditVentanaComponent
  ],
  imports: [
    CommonModule,
    VentanaEditRoutingModule,
    CommonModule,
    TableModule,
    NgxSpinnerModule,
    PanelModule,
    ToggleButtonModule,
    ToolbarModule,
    ButtonModule,
    MenubarModule,
    TabMenuModule,
    SplitButtonModule,
    SidebarModule,
    TableModule,
    DynamicDialogModule,
    ChipModule,
    ToastModule,
    PaginatorModule,
    RippleModule,
    RatingModule,
    InputTextModule,
    CardModule,
    DialogModule,
    DataViewModule,

    CarouselModule,
    PanelModule,
    AutoCompleteModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    InputMaskModule,
    InputNumberModule,
    MultiSelectModule,
    InputTextareaModule,
    RadioButtonModule,
    TabViewModule,
    InputSwitchModule,
    KnobModule,
    KeyFilterModule,
    ListboxModule,
    PasswordModule,
    SliderModule,
    SelectButtonModule,
    ToggleButtonModule,
    TreeSelectModule,
    SpeedDialModule,
    PickListModule,
    DividerModule,
    FieldsetModule,
    SplitterModule,
    ScrollPanelModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    FileUploadModule,
    TooltipModule,
    MenuModule,
    BreadcrumbModule,
    ContextMenuModule,
    MegaMenuModule,
    MessagesModule,
    MessageModule,
    GalleriaModule,
    ImageModule,

    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BlockUIModule,
    CaptchaModule,
    ProgressBarModule,
    TagModule,
    FocusTrapModule,
    StyleClassModule,
    AutoFocusModule,
    MatTableModule,
    MatTabsModule,
    // InplaceModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA7-wlmPnDc7_ErhX28w62wWBko0bABJpY'
    // }),
  ]
})
export class VentanaEditModule { }
