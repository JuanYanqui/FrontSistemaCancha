import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarEstablecimientoRoutingModule } from './registrar-establecimiento-routing.module';
import { RegistrarEstablecimientoComponent } from './pages/registrar-establecimiento/registrar-establecimiento.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EditEstablecimientoModule } from '../edit-establecimiento/edit-establecimiento.module';
import { PanelModule } from 'primeng/panel';
// import { AgmCoreModule } from '@agm/core';
import { Toast, ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
// import { MouseEvent as AGMMouseEvent } from '@agm/core';
// import { LatLngLiteral } from '@agm/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';

import { CarouselModule } from 'primeng/carousel';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { SpeedDialModule } from 'primeng/speeddial';
import { PickListModule } from 'primeng/picklist'; // opc
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
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
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    RegistrarEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RegistrarEstablecimientoRoutingModule,
    MatTableModule,
    MatTabsModule,
    PanelModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7-wlmPnDc7_ErhX28w62wWBko0bABJpY'
    }),
    MatTableModule,
    MatTabsModule,
    PanelModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    KeyFilterModule,
    ToastrModule.forRoot(),
    PasswordModule,
    InputMaskModule,
    ToggleButtonModule,
    DividerModule,
    FileUploadModule,
    DropdownModule,
    PanelModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
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

    InplaceModule,
    EditEstablecimientoModule
    
  ]
})
export class RegistrarEstablecimientoModule { }
